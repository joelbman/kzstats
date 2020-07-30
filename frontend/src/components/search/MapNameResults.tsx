import React, { useState } from 'react'
import useApiRequest from '../util/useApiRequest'
import Map from '../../models/Map'

interface Props {
  searchStr: string
}

const MapNameResults = (props: Props) => {
  const [apiOptions] = useState({
    name: props.searchStr,
    limit: 200,
  })
  const { error, isLoaded, data } = useApiRequest('/maps', apiOptions)

  if (error && error.message) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>
  return (
    <div>
      <h2 className="text-xl block">Map results ({data.length})</h2>
      {data.map((m: Map) => (
        <p>{m.name}</p>
      ))}
    </div>
  )
}

export default MapNameResults
