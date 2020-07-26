import React, { useEffect, useState } from 'react'

interface Props {
  time: number
}

const RunTimeFormatter = ({ time }: Props) => {
  const [finalTime, setFinalTime] = useState('')

  useEffect(() => {
    let seconds = 0,
      minutes = 0,
      hours = 0,
      milliseconds = '0',
      timeStr = ''

    // Change type from float to string for splitting
    timeStr = time.toString()
    timeStr = parseFloat(timeStr).toFixed(2)

    var split = timeStr.split('.')
    seconds = parseInt(split[0], 10)

    // Calculate minutes and remaining seconds
    minutes = parseInt((seconds / 60).toFixed(0))
    seconds = seconds % 60

    // If there are over 59 minutes, calculate hours
    if (minutes > 59) {
      hours = parseInt((minutes / 60).toFixed(0))
      minutes = minutes % 60
    }

    milliseconds = split[1]
    let hoursStr = hours.toString(),
      secondsStr = seconds.toString(),
      minutesStr = minutes.toString()

    // If there are less than 10 seconds and minutes, prefix them with 0
    if (seconds < 10) secondsStr = '0' + seconds.toString()
    if (minutes < 10) minutesStr = '0' + minutes.toString()

    if (hours < 1) hoursStr = ''

    // Add minutes, seconds and milliseconds to the time string
    setFinalTime(hoursStr + minutesStr + ':' + secondsStr + '.' + milliseconds)
  }, [time])

  return <>{finalTime}</>
}

export default RunTimeFormatter
