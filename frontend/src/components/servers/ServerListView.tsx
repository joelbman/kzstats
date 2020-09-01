import Loader from 'components/general/Loader'
import TableSimple from 'components/general/TableSimple'
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

const io = socketIOclient(wsUrl)
let timer = 0

const ServerListView = () => {
  const [servers, setServers] = useState<ServerObject[]>([])
  const [filtered, setFiltered] = useState<ServerObject[]>([])
  const [continent, setContinent] = useState('')
  const [filterStr, setFilterStr] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const requestList = () => {
      io.emit('request-list')
      setTimeout(requestList, 60000)
      setDone(true)
    }

    if (!done) requestList()

    io.on('serverlist', (servers: ServerObject[]) => {
      setServers(servers)
      filterServers(filterStr, continent, servers)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filterServers = (
    filter: string,
    continent: string,
    serverlist?: ServerObject[]
  ) => {
    const server_arr = serverlist ? serverlist : servers

    let arr = []
    if (filter.length > 2) {
      arr = server_arr.filter((s: ServerObject) => {
        return (
          s.map.toLowerCase().includes(filter) ||
          s.name.toLowerCase().includes(filter)
        )
      })
    } else arr = server_arr

    if (continent.length === 2) {
      arr = arr.filter((s: ServerObject) => {
        return s.continentcode === continent
      })
    }

    arr.sort((a, b) => {
      return b.players.length - a.players.length
    })

    setFiltered(arr)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer)
    const val = e.target.value.toLowerCase()
    timer = window.setTimeout(() => {
      setFilterStr(val)
      filterServers(val, continent)
    }, 600)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContinent(e.target.value)
    filterServers(filterStr, e.target.value)
  }

  if (servers.length < 1) return <Loader />

  return (
    <div>
      <h1>Servers</h1>
      <Helmet title="Servers" />
      <div className="mb-4">
        <div className="mr-4 inline-block">
          Filter
          <input
            type="text"
            className="ml-2"
            placeholder="Server name, map name..."
            maxLength={20}
            onChange={handleInput}
          />
        </div>
        <div className="inline-block mt-2 md:mt-0">
          Continent
          <select className="ml-2" onChange={handleSelect} value={continent}>
            <option value="">World</option>
            <option value="EU">Europe</option>
            <option value="NA">North America</option>
            <option value="SA">South America</option>
            <option value="AS">Asia</option>
            <option value="OC">Oceania</option>
            <option value="AF">Africa</option>
          </select>
        </div>
      </div>
      {filtered.length > 0 ? (
        <TableSimple>
          {filtered.map((server: ServerObject, i: number) => (
            <tr key={i}>
              <td>
                <Link to={`/servers/${server.ip}`}>{server.name}</Link>
                <FlagIcon code={server.countrycode} />
              </td>
              <td>
                <Link to={`/maps/${server.map}`}>{server.map}</Link>
              </td>
              <td>
                {server.players.length}/{server.maxplayers}
              </td>
              <td>
                {server.ip}:{server.port}
              </td>
              <td>
                <a href={`steam://connect/${server.ip}:${server.port}`}>Join</a>
              </td>
            </tr>
          ))}
        </TableSimple>
      ) : (
        'No servers found.'
      )}
    </div>
  )
}

export default ServerListView
