import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import PageReloader from '@/components/PageReloader'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import db from '@/lib/db'
import { notFound } from 'next/navigation'
import { pluralize } from '@/lib/utils'

export default async function Prediction({
  params,
}: {
  params: { uuid: string }
}) {
  const prediction = await db.prediction.findUnique({
    where: {
      id: params.uuid,
    },
  })

  if (!prediction) {
    return notFound()
  }

  return (
    <main className="container max-w-screen-sm">
      <div className="flex h-full min-h-screen flex-col justify-center py-16">
        <Link href="/" className="mr-auto inline-flex items-center text-sm">
          <ArrowLeft className="w-4" /> Back
        </Link>
        <div className="mt-4 flex items-center justify-between gap-4">
          <h1 className="text-balance text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
            {prediction.name}
          </h1>
          <Badge variant="default" className="px-4">
            {prediction.version}
          </Badge>
        </div>
        {prediction.imageUrl ? (
          <Image
            className="mt-8 aspect-square w-full rounded-md"
            src={prediction.imageUrl}
            alt={prediction.name}
            width={768}
            height={768}
          />
        ) : (
          <Skeleton className="mt-8 aspect-square w-full bg-gray-200" />
        )}
        <Separator />
        <h3 className="text-balance text-xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
          Prompt
        </h3>
        <p className="mt-2">{prediction.prompt}</p>
        <Separator />
        <h3 className="text-balance text-xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
          Country
        </h3>
        <p className="mt-2">{prediction.country}</p>
        <Separator />
        <h3 className="text-balance text-xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
          Year
        </h3>
        <p className="mt-2">
          {prediction.createdAt.getFullYear() + prediction.year} (in{' '}
          {prediction.year} {pluralize(prediction.year, 'year')})
        </p>
      </div>
      <PageReloader enabled={!prediction.imageUrl} />
    </main>
  )
}

export const revalidate = 60
