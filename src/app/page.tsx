import { Button } from '@/components/ui/button'
import { CountrySelector } from '@/components/CountrySelector'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { YearSelector } from '@/components/YearSelector'

export default function Home() {
  return (
    <main className="container max-w-screen-md">
      <div className="flex h-full min-h-screen flex-col items-center justify-center py-16">
        <div className="pt-[30vh] text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Imagine earth
          </h1>
          <p className="mt-6 flex justify-center gap-2">
            <span>Show me</span>
            <CountrySelector />
            <span>in</span>
            <YearSelector />
          </p>
          <Button type="submit" className="mt-2">
            Create prediction
          </Button>
        </div>
        <hr className="my-16 w-full border-b-gray-200" />
        <div className="space-y-6">
          <h2 className="text-center text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
            Past predictions
          </h2>
          <ul className="grid grid-cols-3 gap-2">
            {[...Array(21)].map((_, i) => (
              <li key={i}>
                <div className="size-48 bg-gray-200"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
