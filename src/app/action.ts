'use server'

import db from '@/lib/db'
import { generateImageWithStableDiffusion } from '@/lib/replicate'
import { generatePrompt } from '@/lib/prompts'
import { getCountryData } from '@/lib/footprintnetwork'
import { pluralize } from '@/lib/utils'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  countryCode: z.string().min(1),
  year: z.coerce.number().min(1),
})

export async function createPrediction(formData: FormData) {
  const data = schema.parse({
    countryCode: formData.get('countryCode'),
    year: formData.get('year'),
  })

  console.log('Fetching country data...')
  const { numberOfEarths } = await getCountryData(data.countryCode)

  console.log('Generating prompt...')
  const { prompt, version } = generatePrompt({
    numberOfEarths: numberOfEarths.value,
    year: data.year,
    countryName: numberOfEarths.countryName,
  })

  console.log('Generating image...')
  const prediction = await generateImageWithStableDiffusion({
    prompt,
  })

  const name = `${numberOfEarths.countryName} in ${data.year} ${pluralize(
    data.year,
    'year'
  )}`

  console.log('Storing prediction...')
  await db.prediction.create({
    data: {
      imageUrl: prediction,
      year: data.year,
      country: numberOfEarths.countryName,
      countryCode: data.countryCode,
      name,
      prompt,
      version,
    },
  })

  revalidatePath('/')

  return { message: 'Prediction created' }
}
