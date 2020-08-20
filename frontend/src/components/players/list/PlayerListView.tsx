import React from 'react'
import { Helmet } from 'react-helmet'
import PlayersTopWorldRecords from './PlayersTopWorldRecords'

const PlayerList = () => {
  return (
    <div>
      <Helmet title="Players" />
      <h1>Players</h1>
      <div
        className="flex justify-between flex-wrap lg:w-4/5"
        style={{ margin: '0 -1em' }}
      >
        <PlayersTopWorldRecords pro={true} />
        <PlayersTopWorldRecords />
      </div>
    </div>
  )
}

export default PlayerList
