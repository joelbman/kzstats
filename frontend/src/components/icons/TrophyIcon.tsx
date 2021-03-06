import React, { useEffect, useRef } from 'react'

interface Props {
  className?: string
  width?: string
  height?: string
}

const TrophyIcon = (props: Props) => {
  const className = useRef('inline mr-2')

  useEffect(() => {
    if (props.className) className.current += props.className
  }, [props.className])

  return (
    <img
      src="/img/icon/trophy.svg"
      alt="Trophy"
      width={props.width || '25'}
      height={props.height || '25'}
      className={className.current}
    />
  )
}

export default TrophyIcon
