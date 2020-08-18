import React from 'react'
import { useImage } from 'react-image'

interface ImgProps {
  src: string
  alt?: string
  width?: string
  height?: string
  className?: string
}

const ImageC = (props: ImgProps) => {
  const { src } = useImage({
    srcList: [props.src, '/img/noimage.png'],
    useSuspense: true,
  })

  return (
    <img
      src={src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={props.className}
    />
  )
}

export default ImageC
