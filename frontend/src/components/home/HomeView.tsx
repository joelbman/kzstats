import React from 'react'
import { Helmet } from 'react-helmet'
import LatestRecords from './LatestRecords'

const HomeView = () => {
  return (
    <>
      <h1>Latest</h1>
      <div className="flex mb-4 flex-col lg:flex-row w-full lg:w-1/2">
        <Helmet title="Latest" />
        <LatestRecords />
      </div>
    </>
  )
}

export default HomeView
