'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="mt-2"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? 'Creating...' : 'Create Prediction'}
    </Button>
  )
}
