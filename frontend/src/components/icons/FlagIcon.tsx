import ImageC from 'components/general/ImageC'
import React, { Suspense } from 'react'

interface Props {
  code: string
}

const FlagIcon = (props: Props) => {
  return (
    <Suspense fallback={<span></span>}>
      <ImageC
        width="16"
        height="11"
        alt={props.code}
        className="inline mr-1 ml-1 border border-gray-dark"
        src={`/img/flag/${props.code?.toLowerCase()}.png`}
      />
    </Suspense>
  )
}

export default FlagIcon
