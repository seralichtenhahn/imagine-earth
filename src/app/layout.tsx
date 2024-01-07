import './globals.css'

import { Inter as FontSans } from 'next/font/google'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Imagine Earth',
  description: 'AI and data imagineing the future.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable
        )}
      >
        {children}
        <Footer />
      </body>
    </html>
  )
}
