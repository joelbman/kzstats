import React, { useEffect, useState } from 'react'

interface Props {
  time: number
}

const RunTimeFormatter = ({ time }: Props) => {
  let timeStr = new Date(time * 1000)
    .toISOString()
    .split('T')[1]
    .replace('Z', '')
  if (timeStr.substr(0, 2) === '00') timeStr = timeStr.slice(3)

  return <>{timeStr}</>
}

export default RunTimeFormatter
