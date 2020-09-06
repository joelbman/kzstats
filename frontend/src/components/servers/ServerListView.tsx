import ErrorHandler from 'components/general/ErrorHandler'
import Loader from 'components/general/Loader'
import TableSimple from 'components/general/TableSimple'
import { FlagIcon } from 'components/icons'
import React, { useEffect, useRef, useState } from 'react'
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
  numplayers: number
  players: Record<string, unknown>[]
}

const wsUrl = process.env.WS_HOST
  ? process.env.WS_HOST
  : 'https://localhost:3001/'

let timer = 0

const ServerListView = () => {
  const io = useRef(socketIOclient(wsUrl, { reconnectionAttempts: 1 }))
  const [servers, setServers] = useState<ServerObject[]>([])
  const [filtered, setFiltered] = useState<ServerObject[]>([])
  const [error, setError] = useState(false)
  const [continent, setContinent] = useState('')
  const [filterStr, setFilterStr] = useState('')

  useEffect(() => {
    let mounted = true

    const requestList = () => {
      if (!mounted) return
      io.current.emit('request-list')
      setTimeout(requestList, 120000)
    }

    requestList()

    io.current.on('serverlist', (servers: ServerObject[]) => {
      if (mounted) {
        setServers(servers)
        filterServers(filterStr, continent, servers)
      }
    })

    io.current.on('connect_error', () => {
      setError(true)
    })

    return () => {
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStr, continent])

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
      return b.numplayers - a.numplayers
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

  if (error)
    return <ErrorHandler local={true} message="Websocket connection error" />
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
        <TableSimple headers={['Server', 'Map', 'Players', 'IP', ' ']}>
          {filtered.map((server: ServerObject, i: number) => (
            <tr key={i}>
              <td>
                <Link to={`/servers/${server.ip}:${server.port}`}>
                  {server.name}
                </Link>
                <FlagIcon code={server.countrycode} />
              </td>
              <td>
                <Link to={`/maps/${server.map}`}>{server.map}</Link>
              </td>
              <td>
                {server.numplayers}/{server.maxplayers}
              </td>
              <td>
                {server.ip}:{server.port}
              </td>
              <td>
                <a href={`steam://connect/${server.ip}:${server.port}`}>
                  <button className="joinbutton">Connect</button>
                </a>
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
