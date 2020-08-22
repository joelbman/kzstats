import React from 'react'
import { Img } from 'react-image'

interface Props {
  code: string
}

const FlagIcon = (props: Props) => {
  return (
    <Img
      width="16"
      height="11"
      alt={props.code}
      className="inline mr-1 ml-1"
      src={[`/img/flag/${props.code?.toLowerCase()}.png`, '/img/noimage.png']}
    />
  )
}

export default FlagIcon
