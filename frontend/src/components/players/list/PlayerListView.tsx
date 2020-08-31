import React from 'react'
import { Helmet } from 'react-helmet'
import PlayersTopWorldRecords from './PlayersTopWorldRecords'

const PlayerList = () => {
  return (
    <div>
      <Helmet title="Players" />
      <h1>Players</h1>
      <div className="flex justify-around flex-wrap md:w-full lg:w-1/2 xl:w-3/5">
        <PlayersTopWorldRecords pro={true} />
        <PlayersTopWorldRecords />
      </div>
    </div>
  )
}

export default PlayerList
