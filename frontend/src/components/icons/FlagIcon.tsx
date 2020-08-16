import React from 'react'
import { Img } from 'react-image'

interface Props {
  code: string
}

const FlagIcon = (props: Props) => {
  return (
    <Img
      width="15"
      height="15"
      alt={props.code}
      className="inline mr-2"
      src={[`/img/flag/${props.code?.toLowerCase()}.png`, '/img/noimage.png']}
    />
  )
}

export default FlagIcon
