import 'server-only'

import { z } from 'zod'

export async function getCountries() {
  const response = await getApiData('/v1/countries')

  const validator = z.array(
    z.object({
      shortName: z.string(),
      countryName: z.string(),
      countryCode: z.string(),
      isoa2: z.string().nullable(),
    })
  )

  const countries = validator.parse(response)

  const countriesWithIsoa2 = countries.filter((country) => country.isoa2)

  // sort countries by name
  return countriesWithIsoa2.sort((a, b) =>
    a.countryName.localeCompare(b.countryName)
  )
}

export async function getCountryData(
  countryCode: string,
  year?: string | number
) {
  const response = await getApiData(
    `/v1/data/${countryCode}/${year ?? new Date().getFullYear() - 2}`
  )

  const recordValidator = z.object({
    value: z.number(),
    year: z.number(),
    score: z.string().optional(),
    shortName: z.string(),
    countryName: z.string(),
    record: z.string(),
  })

  const validator = z.array(recordValidator)

  const records = validator.parse(response)

  const numberOfEarths = records.find((record) => record.record === 'Earths')

  return {
    numberOfEarths: recordValidator.parse(numberOfEarths),
  }
}

async function getApiData(endpoint: string) {
  if (!process.env.FOOTPRINT_NETWORK_API_KEY) {
    throw new Error('FOOTPRINT_NETWORK_API_KEY environment variable is not set')
  }

  return fetch(`https://api.footprintnetwork.org${endpoint}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${Buffer.from(
        `user:${process.env.FOOTPRINT_NETWORK_API_KEY}`,
        'utf-8'
      ).toString('base64')}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}
