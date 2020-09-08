import React from 'react'
import { Helmet } from 'react-helmet'
import LatestRecords from './LatestRecords'
import NewsPanel from './NewsPanel'

const HomeView = () => {
  return (
    <div>
      <h1>Latest</h1>
      <Helmet title="Latest" />
      <div className="flex flex-col lg:flex-row jusitfy-center w-full">
        <div className="w-full lg:w-1/2 mb-4 lg:mr-4 lg:mb-0">
          <LatestRecords />
        </div>
        <div className="w-full lg:w-1/2">
          <NewsPanel />
        </div>
      </div>
    </div>
  )
}

export default HomeView
