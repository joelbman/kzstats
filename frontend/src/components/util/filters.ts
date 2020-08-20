const textLimiter = (content: string, limit?: number) => {
  if (content.length > (limit || 25)) return `${content.slice(0, 20)}...`
  return content
}

const runtimeFormat = (time: number) => {
  let timeStr = new Date(time * 1000)
    .toISOString()
    .split('T')[1]
    .replace('Z', '')
  if (timeStr.substr(0, 2) === '00') timeStr = timeStr.slice(3)

  return timeStr
}

const timeAgoFormat = (datetime: string) => {
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
  if (result > 1) unit += 's'

  return `${result.toFixed(0)} ${unit} ago`
}

const difficultyToText = (difficulty: number): string => {
  switch (difficulty) {
    case 1:
      return 'Very easy'
    case 2:
      return 'Easy'
    case 3:
      return 'Medium'
    case 4:
      return 'Hard'
    case 5:
      return 'Very hard'
    case 6:
      return 'Death'
    default:
      return 'Unknown'
  }
}

export { textLimiter, runtimeFormat, timeAgoFormat, difficultyToText }
