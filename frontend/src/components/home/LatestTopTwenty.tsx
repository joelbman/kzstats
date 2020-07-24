import React, { useState } from 'react'
import useApiRequest from '../util/useApiRequest'
import { LazyLoadImage } from 'react-lazy-load-image-component'

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

const LatestTopTwenty = () => {
  const [apiOptions, setApiOptions] = useState({
    limit: 200,
    place_top_at_least: 20,
  })
  const { error, isLoaded, data } = useApiRequest(
    '/records/top/recent',
    apiOptions
  )

  return (
    <div>
      {data.map((rec: Record) => (
        <div className="h-48 mt-5 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
          <LazyLoadImage
            alt={rec.map_name}
            src={`img/map/thumb/tn_${rec.map_name}.jpg`}
            height="150"
            width="150"
            placeholderSrc="img/questionmark.png"
            className="h-full"
          />
        </div>
      ))}
    </div>
  )
}

export default LatestTopTwenty
