import React from 'react'
import { Helmet } from 'react-helmet'
import PlayersTopPerMode from './PlayersTopPerMode'

const PlayerList = () => {
  return (
    <div>
      <Helmet title="Players" />
      <h2>Top 15</h2>
      <div className="flex justify-between flex-wrap mb-8 lg:mr-8 md:mr-8">
        <br />
        <PlayersTopPerMode
          mode_name="KZTimer"
          tickrates={128}
          mode_ids={200}
          has_teleports={false}
        />
        <PlayersTopPerMode
          mode_name="Simple KZ"
          tickrates={128}
          mode_ids={201}
          has_teleports={false}
        />
        <PlayersTopPerMode
          mode_name="Vanilla"
          tickrates={128}
          mode_ids={202}
          has_teleports={false}
        />
      </div>
    </div>
  )
}

export default PlayerList
