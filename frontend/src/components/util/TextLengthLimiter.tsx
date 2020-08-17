import React from 'react'

interface Props {
  content: string
  limit?: number
}

const TextLengthLimiter = (props: Props) => {
  if (props.content.length > (props.limit || 25))
    return <>{props.content.slice(0, 20)}...</>
  return <>{props.content}</>
}

export default TextLengthLimiter
