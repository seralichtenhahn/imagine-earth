import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import React from 'react'
import { pluralize } from '@/lib/utils'

type YearSelectorProps = {
  onChange: (value: string) => void
}

export function YearSelector() {
  return (
    <Select required name="year">
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="x years" />
      </SelectTrigger>
      <SelectContent>
        {[...Array(100)].map((_, i) => (
          <SelectItem key={i} value={`${i}`}>
            {i + 1} {pluralize(i + 1, 'year')}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
