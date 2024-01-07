import Image from 'next/image'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import db from '@/lib/db'

export default async function PredictionGallery() {
  const lastPredictions = await db.prediction.findMany({
    take: 21,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <h2 className="text-center text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
        Past predictions
      </h2>
      <ul className="grid grid-cols-3 gap-2">
        {[...Array(21)].map((_, i) => {
          const prediction = lastPredictions[i]

          return (
            <li key={i}>
              {prediction ? (
                <Image
                  className="size-48 w-full rounded-md"
                  src={prediction.imageUrl}
                  alt={prediction.name}
                  width={192}
                  height={192}
                />
              ) : (
                <Skeleton className="size-48 bg-gray-200" />
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
