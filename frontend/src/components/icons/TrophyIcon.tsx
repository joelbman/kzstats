import React from 'react'

interface Props {
  className?: string
}

const TrophyIcon = (props: Props) => {
  return (
    <img
      src="/img/icon/trophy.svg"
      alt="Trophy"
      className={`h-5 w-5 inline mr-2 ${props.className}`}
    />
  )
}

export default TrophyIcon
