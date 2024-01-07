import React from 'react'

export default function Footer() {
  return (
    <p className="my-8 text-balance text-center text-sm">
      A project by{' '}
      <a
        href="https://twitter.com/seralichtenhahn"
        target="_blank"
        rel="noopener"
        className="underline"
      >
        Serafin Lichtenhahn
      </a>{' '}
      · Data by the{' '}
      <a
        href="https://www.footprintnetwork.org/"
        target="_blank"
        rel="noopener"
        className="underline"
      >
        Global Footprint Network
      </a>
    </p>
  )
}
