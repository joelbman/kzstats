import React from 'react'
import { Helmet } from 'react-helmet'
import PlayersTopWorldRecords from './PlayersTopWorldRecords'

const PlayerList = () => {
  return (
    <div>
      <Helmet title="Players" />
      <h1>Players</h1>
      <div className="flex justify-between flex-wrap xl:w-3/5">
        <PlayersTopWorldRecords pro={true} />
        <PlayersTopWorldRecords />
      </div>
    </div>
  )
}

export default PlayerList
