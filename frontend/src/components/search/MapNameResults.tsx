import React from 'react'
import { Link } from 'react-router-dom'
import { KZMap } from 'types'

interface Props {
  data: KZMap[]
}

const MapNameResults = (props: Props) => {
  return (
    <div>
      <h2>
        Maps <small>({props.data.length})</small>
      </h2>
      {props.data.length > 0 ? (
        <div>
          {props.data.map((m: KZMap, i: number) => (
            <Link to={`/maps/${m.name}`} key={i}>
              {m.name}
            </Link>
          ))}
        </div>
      ) : (
        <p>No maps found.</p>
      )}
    </div>
  )
}

export default MapNameResults
