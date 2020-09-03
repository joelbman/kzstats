import Table from 'components/general/Table'
import React, { useEffect, useState } from 'react'

interface Props {
  data: any
}

interface QueryPlayer {
  name: string
  time: number
}

const ServerDetailStatus = (props: Props) => {
  const [data, setData] = useState<any>(null)
  const [players, setPlayers] = useState<QueryPlayer[]>([])

  useEffect(() => {
    const filtered = props.data.bots
      .filter((p: QueryPlayer) => {
        if (p.time && p.name) {
          p.name = '[BOT] ' + p.name
          return true
        }
        return false
      })
      .concat(
        props.data.players.filter((p: QueryPlayer) => {
          return p.time && p.name
        })
      )
    setData(props.data)
    setPlayers(filtered)
  }, [props.data])

  if (!data)
    return (
      <div>
        <h2>Status</h2> Server is offline.
      </div>
    )

  const renderPlayers = () => {
    if (
      (data.players[0]?.time === undefined ||
        data.bots[0]?.time === undefined) &&
      data.players.length + data.bots.length > 0
    )
      return <p>Server does not provide player information.</p>

    if (players.length > 0) {
      return (
        <Table
          className="mt-2"
          data={players}
          columns={[{ key: 'name' }, { key: 'time', type: 'runtime' }]}
          sort={{ key: 'time', desc: true }}
        />
      )
    } else return <p>No players online.</p>
  }

  return (
    <div>
      {data?.name && (
        <div>
          <h2>
            Players ({data.bots.length + data.players.length}/{data.maxplayers})
          </h2>
          {renderPlayers()}
        </div>
      )}
    </div>
  )
}

export default ServerDetailStatus
