import React from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  map_name: string
}

const MapDetailView = (props: Props) => {
  return (
    <div>
      <Helmet title={props.map_name} />
    </div>
  )
}

export default MapDetailView
