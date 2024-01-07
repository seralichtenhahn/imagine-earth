import { CountrySelector } from '@/components/CountrySelector'
import CreatePredictionForm from './form'
import PredictionGallery from '@/components/PredictionGallery'
import React from 'react'
import { YearSelector } from '@/components/YearSelector'

export default function Home() {
  return (
    <main className="container max-w-screen-md">
      <div className="flex h-full min-h-screen flex-col items-center justify-center py-16">
        <div className="pt-[30vh] text-center">
          <CreatePredictionForm>
            <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
              Imagine earth
            </h1>
            <p className="mt-6 flex justify-center gap-2">
              <span>Show me</span>
              <CountrySelector />
              <span>in</span>
              <YearSelector />
            </p>
          </CreatePredictionForm>
        </div>
        <hr className="my-16 w-full border-b-gray-200" />
        <PredictionGallery />
      </div>
    </main>
  )
}
