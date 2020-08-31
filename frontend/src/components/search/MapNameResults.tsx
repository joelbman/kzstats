import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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

  if (error) return error
  if (loader) return loader
  return (
    <div className="flex-grow">
      <h2>
        Maps <small>({data.length})</small>
      </h2>
      {data.length > 0 ? (
        <div>
          {data.map((m: Map) => (
            <Link to={`/maps/${m.name}`}>{m.name}</Link>
          ))}
        </div>
      ) : (
        <p>No maps found.</p>
      )}
    </div>
  )
}

export default MapNameResults
