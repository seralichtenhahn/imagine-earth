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

  // sort countries by name
  return countries.sort((a, b) => a.countryName.localeCompare(b.countryName))
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
