import React, { useState } from 'react'
import useApiRequest from '../util/useApiRequest'

interface Record {
  id: number
  steamid64: string
  player_name: string
  steam_id: string
  server_id: number
  map_id: number
  stage: number
  mode: string
  tickrate: number
  time: number
  teleports: number
  created_on: string
  updated_on: string
  updated_by: number
  place: number
  top_100: number
  top_100_overall: number
  server_name: string
  map_name: string
  points: number
  record_filter_id: number
  replay_id: number
}

const LatestWorldRecords = () => {
  const [apiOptions, setApiOptions] = useState({
    limit: 200,
    place_top_at_least: 1,
  })
  const { error, isLoaded, data } = useApiRequest(
    '/records/top/recent',
    apiOptions
  )

  return (
    <div>
      {data.map((rec: Record) => (
        <p>{rec.player_name}</p>
      ))}
    </div>
  )
}

export default LatestWorldRecords
