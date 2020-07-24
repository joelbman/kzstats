import React from 'react'
import { Helmet } from 'react-helmet'
import Panel from '../general/Panel'
import LatestWorldRecords from './LatestWorldRecords'
import LatestTopTwenty from './LatestTopTwenty'

const Home = () => {
  return (
    <React.Fragment>
      <Helmet title="Latest" />
      <div className="flex mb-4">
        <Panel heading="World records">
          <LatestWorldRecords />
        </Panel>
        <Panel heading="Top 20 times">
          <LatestTopTwenty />
        </Panel>
      </div>
    </React.Fragment>
  )
}

export default Home
