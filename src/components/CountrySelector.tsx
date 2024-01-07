import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { getCountries } from '@/lib/footprintnetwork'

export async function CountrySelector() {
  const countries = await getCountries()

  return (
    <Select required name="countryCode">
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="country" />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.countryCode} value={country.countryCode}>
            {country.countryName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
