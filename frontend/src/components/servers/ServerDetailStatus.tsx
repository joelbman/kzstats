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
    if (!props.data) return
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
        <h1>Status</h1> Server is offline.
      </div>
    )

  const renderPlayers = () => {
    // The +2 is a buffer for empty servers running inactive bots or invalid replay bots
    if (data.players.length + data.bots.length > players.length + 2)
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
          <h1>
            Players ({players.length}/{data.maxplayers})
          </h1>
          {renderPlayers()}
        </div>
      )}
    </div>
  )
}

export default ServerDetailStatus
