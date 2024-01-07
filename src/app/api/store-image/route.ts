import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const validator = z.object({
  output: z.tuple([z.string()]),
})

if (!process.env.AWS_REGION) {
  throw new Error('AWS_REGION environment variable is not set')
}

if (!process.env.AWS_ACCESS_KEY_ID) {
  throw new Error('AWS_ACCESS_KEY_ID environment variable is not set')
}

if (!process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error('AWS_SECRET_ACCESS_KEY environment variable is not set')
}

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export const POST = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('predictionId')

  console.log('Received webhook for prediction', id)

  if (!id || typeof id !== 'string') {
    return new Response(JSON.stringify({ success: false }), {
      headers: { 'content-type': 'application/json' },
      status: 400,
    })
  }

  const data = await request.json()

  const { output } = validator.parse(data)

  console.log("Fetching image from Replicate's API...", output[0])
  const image = await fetch(output[0]).then((res) => res.arrayBuffer())

  console.log('Storing image in S3...')
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: id + '.png',
      ACL: 'public-read',
      ContentType: 'image/png',
      Body: Buffer.from(image),
    })
  )

  console.log('Updating prediction...')
  const prediction = await db.prediction.update({
    where: { id },
    data: {
      imageUrl: `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${id}.png`,
    },
  })

  revalidatePath('/prediction/' + prediction.id)
  revalidatePath('/')

  console.log('Stored image for prediction', prediction.id)

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  })
}
