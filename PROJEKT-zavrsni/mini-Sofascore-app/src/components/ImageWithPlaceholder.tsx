import Image from 'next/image'
import { useState } from 'react'

export function ImageWithPlaceholder(props: {
  source: string
  placeholder: string
  alt: string
  w: number
  h: number
}) {
  const [imgSrc, setImgSrc] = useState(props.source)

  return (
    <Image
      src={imgSrc}
      onError={() => {
        setImgSrc(props.placeholder)
      }}
      width={props.w}
      height={props.h}
      alt={props.alt}
    ></Image>
  )
}
