import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Pluralize string function
// source: https://www.30secondsofcode.org/js/s/pluralize
export function pluralize(val: number, word: string, plural = word + 's') {
  return [1, -1].includes(val) ? word : plural
}
