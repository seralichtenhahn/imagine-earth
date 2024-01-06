import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import React from 'react'
import { pluralize } from '@/lib/utils'

export function YearSelector() {
  return (
    <Select>
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
