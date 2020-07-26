import React from 'react'
import { Helmet } from 'react-helmet'

import LatestRecords from './LatestRecords'

const Home = () => {
  return (
    <React.Fragment>
      <Helmet title="Latest" />
      <div className="flex mb-4 flex-col lg:flex-row w-full lg:w-1/2">
        <LatestRecords top={20} />
      </div>
    </React.Fragment>
  )
}

export default Home
