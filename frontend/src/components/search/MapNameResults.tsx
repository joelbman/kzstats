import React, { useState } from 'react'
import Map from '../../models/Map'
import useApiRequest from '../util/useApiRequest'

interface Props {
  searchStr: string
}

const MapNameResults = (props: Props) => {
  const [apiOptions] = useState({
    name: props.searchStr,
    limit: 200,
  })
  const { error, loader, data } = useApiRequest('/maps', apiOptions)

  if (error && error.message) return <div>Error: {error.message}</div>
  if (!loader) return <div className="loader"></div>
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
