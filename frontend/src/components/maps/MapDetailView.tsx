import React from 'react'
import { Helmet } from 'react-helmet'
import MapDetailRecords from './MapDetailRecords'
import MapDetailRecordHistory from './MapDetailRecordHistory'

interface Props {
  match: { params: { mapname: string } }
}

const MapDetailView = (props: Props) => {
  const mapname = props.match.params.mapname
  return (
    <div>
      <Helmet title={mapname} />
      <MapDetailRecordHistory mapname={mapname} />
      <MapDetailRecords mapname={mapname} />
    </div>
  )
}

export default MapDetailView
