import React, { useState } from 'react'
import useApiRequest from '../../util/useApiRequest'

interface Props {
  steamid64: string
}

const PlayerJumpStats = (props: Props) => {
  const [apiOptions, setApiOptions] = useState({ steamid64: props.steamid64 })
  const { error, isLoaded, data } = useApiRequest('/jumpstats', apiOptions)
  if (error && error.message) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>
  return <div></div>
}

export default PlayerJumpStats
