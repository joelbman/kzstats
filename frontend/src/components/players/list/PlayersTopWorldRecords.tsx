import React, { useContext, useMemo, useState } from 'react'
import { ModeContext } from '../../../context/ModeContext'
import Table from '../../general/Table'
import useApiRequest from '../../util/useApiRequest'

interface Props {
  pro?: boolean
  limit?: number
}

interface Player {
  count: number
  player_name: string
  steamid64: string
}

const PlayersTopWorldRecords = (props: Props) => {
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

  const { state: modeState } = useContext(ModeContext)
  const [apiOptions, setApiOptions] = useState({
    limit: props.limit || 20,
    mode_ids: modeNameToId(modeState.kzMode),
    tickrates: modeState.tickrate || 128,
    has_teleports: props.pro ? true : undefined,
  })

  const { error, isLoaded, data } = useApiRequest(
    '/records/top/world_records',
    apiOptions
  )

  useMemo(() => {
    setApiOptions({
      limit: props.limit || 20,
      mode_ids: modeNameToId(modeState.kzMode),
      tickrates: modeState.tickrate || 128,
      has_teleports: props.pro ? true : undefined,
    })
  }, [modeState.kzMode, modeState.tickrate])

  if (error && error.message) return <div>Error: {error.message}</div>
  if (!isLoaded)
    return (
      <div
        className="mb-8 lg:mr-8 md:mr-8 flex-grow"
        style={{ margin: '0 1em' }}
      >
        <div className="loader"></div>
      </div>
    )

  return (
    <div className="mb-8 lg:mr-8 md:mr-8 flex-grow" style={{ margin: '0 1em' }}>
      <h3 className="text-lg font-bold block">
        {props.pro ? 'Pro' : 'Overall'}
      </h3>
      <Table headers={['#', 'Player', 'Count']} className="w-full">
        {data.slice(0, 15).map((p: Player, i: number) => (
          <tr key={i}>
            <td>{i + 1}.</td>
            <td>
              <a href={`/players/${p.steamid64}`}>{p.player_name}</a>
            </td>
            <td>{p.count}</td>
          </tr>
        ))}
      </Table>
    </div>
  )
}

export default PlayersTopWorldRecords
