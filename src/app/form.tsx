'use client'

import React from 'react'
import { SubmitButton } from '@/components/SubmitButton'
import { createPrediction } from './action'
import { useFormState } from 'react-dom'

type CreatePredictionFormProps = {
  children: React.ReactNode | React.ReactNode[]
}

export default function CreatePredictionForm({
  children,
}: CreatePredictionFormProps) {
  return (
    <form action={createPrediction}>
      {children}
      <SubmitButton />
    </form>
  )
}
