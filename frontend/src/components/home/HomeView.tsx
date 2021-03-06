import React from 'react'
import { Helmet } from 'react-helmet'
import LatestRecords from './LatestRecords'
import NewsPanel from './NewsPanel'

const HomeView = () => {
  return (
    <div className="mb-4">
      <h1>Latest</h1>
      <Helmet title="Latest" />
      <div className="flex flex-col lg:flex-row jusitfy-center w-full">
        <div className="w-full lg:w-1/2 mb-8 lg:mr-8 lg:mb-0" style={{ maxWidth: '520px' }}>
          <LatestRecords />
        </div>
        <div className="w-full lg:w-1/2" style={{ maxWidth: '600px' }}>
          <NewsPanel />
        </div>
      </div>
    </div>
  )
}

export default HomeView
