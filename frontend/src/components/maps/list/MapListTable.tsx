import React from 'react'
import { KZMap } from 'types'

interface Props {
  maps: KZMap[]
}

const MapListTable = (props: Props) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 grid-flow-row w-4/5">
      {props.maps.map((m: KZMap) => (
        <div>
          <a href={`/maps/${m.name}`}>{m.name}</a>
        </div>
      ))}
    </div>
  )
}

export default MapListTable
