import React, { useState, useMemo } from 'react'
import useApiRequest from '../util/useApiRequest'

interface Props {
  searchStr: string
}

interface Player {
  name: string
  steamid64: string
  steam_id: string
  is_banned: boolean
  total_records: number
}

const PlayerNameResults = (props: Props) => {
  const [apiOptions, setApiOptions] = useState({
    name: props.searchStr,
    limit: 200,
  })
  const { error, isLoaded, data } = useApiRequest('/players', apiOptions)

  useMemo(() => {
    setApiOptions({
      name: props.searchStr,
      limit: 200,
    })
  }, [props.searchStr])

  if (error && error.message) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>
  return (
    <div>
      {data.map((p: Player) => (
        <p>{p.name}</p>
      ))}
    </div>
  )
}

export default PlayerNameResults
