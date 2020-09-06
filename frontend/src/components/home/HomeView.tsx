import React from 'react'
import { Helmet } from 'react-helmet'
import LatestRecords from './LatestRecords'

const HomeView = () => {
  return (
    <div>
      <h1>Latest</h1>
      <Helmet title="Latest" />
      <div className="flex flex-col lg:flex-row w-full">
        <div className="xl:w-1/2 mb-4 lg:mr-4 lg:mb-0">
          <LatestRecords />
        </div>
        <div className="xl:w-1/2">
          <LatestRecords type="tp" />
        </div>
      </div>
    </div>
  )
}

export default HomeView
