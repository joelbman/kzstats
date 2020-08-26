import useApiRequest from 'components/util/useApiRequest'
import React, { useState } from 'react'

interface Props {
  steamid64: string
}

const PlayerJumpStats = (props: Props) => {
  const [apiOptions] = useState({ steamid64: props.steamid64 })
  const { error, loader, data } = useApiRequest('/jumpstats', apiOptions)
  if (error?.message) return <div>Error: {error.message}</div>
  if (loader) return loader
  return <div></div>
}

export default PlayerJumpStats
