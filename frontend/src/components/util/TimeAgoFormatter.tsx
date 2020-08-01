import React from 'react'

interface Props {
  datetime: string
}

const TimeAgoFormatter = ({ datetime }: Props) => {
  const dt =
    Date.parse(datetime) - new Date(datetime).getTimezoneOffset() * 60000
  let result = (Date.now() - dt) / 1000
  let unit = 'seconds'

  if (result > 59) {
    result = result / 60
    unit = 'minute'
    if (result > 59) {
      result = result / 60
      unit = 'hour'
      if (result > 23) {
        result = result / 24
        unit = 'day'
        if (result > 6) {
          result = result / 7
          unit = 'week'
        }
      }
    }
  }
  if (result > 1) unit = unit + 's'
  const finalStr = result.toFixed(0) + ' ' + unit + ' ago'

  return <>{finalStr}</>
}
export default TimeAgoFormatter
