'use client'

import React, { useEffect } from 'react'

type PageReloaderProps = {
  enabled: boolean
}

export default function PageReloader({ enabled }: PageReloaderProps) {
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (enabled) {
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    }

    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [enabled])

  return null
}
