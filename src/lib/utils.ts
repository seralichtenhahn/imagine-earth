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

export function getBaseURL() {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return process.env.NEXT_PUBLIC_VERCEL_URL
  }

  if (process.env.BASE_URL) {
    return process.env.BASE_URL
  }

  throw new Error('BASE_URL environment variable is not set')
}
