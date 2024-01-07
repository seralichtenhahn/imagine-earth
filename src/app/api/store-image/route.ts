import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const validator = z.object({
  output: z.tuple([z.string()]),
})

export const POST = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('predictionId')

  if (!id || typeof id !== 'string') {
    return new Response(JSON.stringify({ success: false }), {
      headers: { 'content-type': 'application/json' },
      status: 400,
    })
  }

  const data = await request.json()

  const { output } = validator.parse(data)

  const prediction = await db.prediction.update({
    where: { id },
    data: {
      imageUrl: output[0],
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
