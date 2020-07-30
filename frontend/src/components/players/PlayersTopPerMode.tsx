import React, { useState } from 'react'
import useApiRequest from '../util/useApiRequest'
import Table from '../general/Table'

interface Props {
  mode_name: string
  has_teleports?: boolean
  mode_ids?: number
  tickrates?: number
  limit?: number
}

interface Player {
  count: number
  player_name: string
  steamid64: string
}

const PlayersTopPerMode = (props: Props) => {
  const [apiOptions, setApiOptions] = useState({
    limit: props.limit || 200,
    mode_ids: props.mode_ids || 200,
    tickrates: props.tickrates || 128,
    has_teleports: props.has_teleports,
  })

  const { error, isLoaded, data } = useApiRequest(
    '/records/top/world_records',
    apiOptions
  )

  if (error && error.message) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="flex-grow mb-8 lg:mr-8 md:mr-8">
      <h3 className="text-lg font-bold block">{props.mode_name}</h3>
      <Table headers={['#', 'Player', 'Count']}>
        {data.slice(0, 15).map((p: Player, i: number) => (
          <tr>
            <td>{i + 1}.</td>
            <td>{p.player_name}</td>
            <td>{p.count}</td>
          </tr>
        ))}
      </Table>
    </div>
  )
}

export default PlayersTopPerMode
