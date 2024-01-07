'use server'

import { getBaseURL, pluralize } from '@/lib/utils'

import db from '@/lib/db'
import { generateImageWithStableDiffusion } from '@/lib/replicate'
import { generatePrompt } from '@/lib/prompts'
import { getCountryData } from '@/lib/footprintnetwork'
import { redirect } from 'next/navigation'
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

  console.log('Storing prediction...')

  const name = `${numberOfEarths.countryName} in ${data.year} ${pluralize(
    data.year,
    'year'
  )}`

  const savedPrediction = await db.prediction.create({
    data: {
      year: data.year,
      country: numberOfEarths.countryName,
      countryCode: data.countryCode,
      name,
      prompt,
      version,
    },
  })

  console.log('Generating image...')

  const callbackUrl = `${getBaseURL()}/api/store-image?predictionId=${
    savedPrediction.id
  }`

  generateImageWithStableDiffusion({
    prompt,
    callbackUrl,
  })

  return redirect('/prediction/' + savedPrediction.id)
}
