import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import MapListGrid from './MapListGrid'
import MapListTable from './MapListTable'

const MapsIndex = () => {
  const [isGrid, setIsGrid] = useState(1)

  return (
    <React.Fragment>
      <Helmet title="Maps" />
      <div className="max-w-sm w-full lg:max-w-full lg:flex rounded overflow-hidden shadow-lg bg-gray-900">
        <div className="max-w text-4xl block">Filters</div>
        <div className="grid grid-cols-4 gap-4">
          <div>Search</div>
        </div>
      </div>
      {isGrid ? <MapListGrid /> : <MapListTable />}
    </React.Fragment>
  )
}

export default MapsIndex
