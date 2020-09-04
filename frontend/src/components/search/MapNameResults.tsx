import React from 'react'
import { Link } from 'react-router-dom'
import Map from '../../models/Map'

interface Props {
  data: Map[]
}

const MapNameResults = (props: Props) => {
  return (
    <div>
      <h2>
        Maps <small>({props.data.length})</small>
      </h2>
      {props.data.length > 0 ? (
        <div>
          {props.data.map((m: Map) => (
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
