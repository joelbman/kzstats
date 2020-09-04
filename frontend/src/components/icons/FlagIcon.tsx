import ImageC from 'components/general/ImageC'
import React, { Suspense } from 'react'

interface Props {
  code: string
  className?: string
}

const FlagIcon = (props: Props) => {
  return (
    <Suspense fallback={<span></span>}>
      <ImageC
        width="18"
        height="12"
        alt={props.code}
        className={`inline mx-1 border border-black ${props.className}`}
        src={`/img/flag/${props.code?.toLowerCase()}.png`}
      />
    </Suspense>
  )
}

export default FlagIcon
