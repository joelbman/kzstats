import RuntypeSelect from 'components/forms/RuntypeSelect'
import { ModeContext } from 'context/ModeContext'
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import PlayersTopRanks from './PlayersTopRanks'
import PlayersTopWorldRecords from './PlayersTopWorldRecords'

const modeNameToId = (modeName: string) => {
  switch (modeName) {
    case 'kz_timer':
      return 200
    case 'kz_simple':
      return 201
    case 'kz_vanilla':
      return 202
    default:
      return 200
  }
}

const PlayerList = () => {
  const { state: modeState } = useContext(ModeContext)
  const [runtype, setRuntype] = useState(localStorage.getItem('kzRuntype') || 'pro')

  const convertRunType = (runtype: string): boolean | undefined => {
    if (runtype === 'pro') return false
    if (runtype === 'tp') return true
    return undefined
  }

  return (
    <div>
      <Helmet title="Players" />
      <h1>Players</h1>
      <div className="my-4">
        Runtype:
        <RuntypeSelect
          callback={(val) => {
            setRuntype(val)
          }}
        />
      </div>
      <div className="flex flex-wrap md:flex-no-wrap w-full">
        <PlayersTopWorldRecords has_teleports={convertRunType(runtype)} mode={modeNameToId(modeState.kzMode)} tickrate={modeState.tickrate} />
        <PlayersTopRanks has_teleports={convertRunType(runtype)} mode={modeNameToId(modeState.kzMode)} tickrate={modeState.tickrate} />
      </div>
    </div>
  )
}

export default PlayerList
