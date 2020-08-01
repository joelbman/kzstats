import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import MapListGrid from './MapListGrid'
import MapListTable from './MapListTable'
import useApiRequest from '../../util/useApiRequest'

const MapListView = () => {
  const [apiOptions, setApiOptions] = useState({
    is_verified: true,
  })
  const { error, isLoaded, data } = useApiRequest('/maps', apiOptions)
  const [filterStr, setFilterStr] = useState('')
  const [isGrid, setIsGrid] = useState(1)

  if (error !== null) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>

  return (
    <React.Fragment>
      <Helmet title="Maps" />

      {isGrid ? <MapListGrid maps={data} /> : <MapListTable maps={data} />}
    </React.Fragment>
  )
}

export default MapListView
