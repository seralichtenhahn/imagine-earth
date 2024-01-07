'use client'

import NextImage from 'next/image'
import React from 'react'

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width: number
  height: number
  alt: string
  src: string
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, ...props }, ref) => {
    return (
      <NextImage
        className={className}
        ref={ref}
        {...props}
        loader={({ src }) => src}
      />
    )
  }
)

Image.displayName = 'Image'

export { Image }
