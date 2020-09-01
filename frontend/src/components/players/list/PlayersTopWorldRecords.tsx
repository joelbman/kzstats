import Axios from 'axios'
import Table from 'components/general/Table'
import React, { useContext, useMemo, useState } from 'react'
import { ModeContext } from '../../../context/ModeContext'
import useApiRequest from '../../util/useApiRequest'

interface Props {
  pro?: boolean
}

interface Player {
  count: number
  player_name: string
  steamid64: string
}

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

const PlayersTopWorldRecords = (props: Props) => {
  const { state: modeState } = useContext(ModeContext)
  const [playerDetails, setPlayerDetails] = useState<any>({})
  const [apiOptions, setApiOptions] = useState({
    limit: 20,
    mode_ids: modeNameToId(modeState.kzMode),
    tickrates: modeState.tickrate || 128,
    has_teleports: props.pro ? true : undefined,
  })
  const { error, loader, data } = useApiRequest(
    '/records/top/world_records',
    apiOptions,
    false,
    true
  )

  useMemo(() => {
    setApiOptions({
      limit: 20,
      mode_ids: modeNameToId(modeState.kzMode),
      tickrates: modeState.tickrate || 128,
      has_teleports: props.pro ? true : undefined,
    })
  }, [modeState.kzMode, modeState.tickrate, props.pro])

  if (error) return error
  if (loader) return loader

  const columns = [
    { key: 'player_name', type: 'player', header: 'Player' },
    { key: 'count' },
  ]

  return (
    <div className="mb-8 lg:mr-4 mr-2 flex-grow">
      <h3 className="text-lg block">
        Top 15 - {props.pro ? 'Pro' : 'Overall'}
      </h3>
      <Table
        data={data}
        columns={columns}
        sort={{ key: 'count', desc: true }}
        className="w-full"
      />
    </div>
  )
}

export default PlayersTopWorldRecords
