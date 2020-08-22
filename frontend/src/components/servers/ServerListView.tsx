import Table from 'components/general/Table'
import { FlagIcon } from 'components/icons'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import socketIOclient from 'socket.io-client'

interface ServerObject {
  ip: string
  port: number
  name: string
  map: string
  maxplayers: number
  countrycode: string
  continentcode?: string
  players: Record<string, unknown>[]
}

const wsUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://lakka.kapsi.fi:62513/'
    : 'https://localhost:3001/'

const ServerListView = () => {
  const [servers, setServers] = useState<ServerObject[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    const io = socketIOclient(wsUrl)

    const requestList = () => {
      io.emit('request-list')
      setTimeout(requestList, 60000)
      setDone(true)
    }

    if (!done) requestList()

    io.on('serverlist', (servers: ServerObject[]) => {
      servers.sort((a, b) => {
        return b.players.length - a.players.length
      })
      setServers(servers)
    })
  })

  return (
    <div>
      <h1>Servers</h1>
      <Helmet title="Servers" />
      {servers.length > 0 ? (
        <Table>
          {servers.map((server: ServerObject, i: number) => (
            <tr key={i}>
              <td>
                <Link to={`/servers/${server.ip}`}>{server.name}</Link>
                <FlagIcon code={server.countrycode} />
              </td>
              <td>
                {server.ip}:{server.port}
              </td>
              <td>
                <Link to={`/maps/${server.map}`}>{server.map}</Link>
              </td>
              <td>
                {server.players.length}/{server.maxplayers}
              </td>
              <td>
                <a href={`steam://connect/${server.ip}:${server.port}`}>Join</a>
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <div>Error retrieving servers</div>
      )}
    </div>
  )
}

export default ServerListView
