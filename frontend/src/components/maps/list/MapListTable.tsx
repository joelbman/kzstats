import React from 'react'
import Map from '../../../models/Map'

interface Props {
  maps: Map[]
}

const MapListTable = (props: Props) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 grid-flow-row w-4/5">
      {props.maps.map((m: Map) => (
        <div>
          <a href={`/maps/${m.name}`}>{m.name}</a>
        </div>
      ))}
    </div>
  )
}

export default MapListTable
