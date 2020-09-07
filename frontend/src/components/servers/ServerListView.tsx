import Loader from 'components/general/Loader'
import TableSimple from 'components/general/TableSimple'
import { FlagIcon } from 'components/icons'
import useApiRequest from 'hooks/useApiRequest'
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

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

const ServerListView = () => {
  const timer = useRef(0)
  const [filtered, setFiltered] = useState<ServerObject[]>([])
  const [continent, setContinent] = useState('')
  const [filterStr, setFilterStr] = useState('')

  const { error, loader, data } = useApiRequest('/server/', null, true)

  const filterServers = (
    filter: string,
    continent: string,
    serverlist?: ServerObject[]
  ) => {
    const server_arr = serverlist ? serverlist : data

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

    arr.sort((a: ServerObject, b: ServerObject) => {
      return b.numplayers - a.numplayers
    })

    setFiltered(arr)
  }

  useEffect(() => {
    filterServers(filterStr, continent, data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStr, continent, data])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer.current)
    const val = e.target.value.toLowerCase()
    timer.current = window.setTimeout(() => {
      setFilterStr(val)
      filterServers(val, continent)
    }, 600)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContinent(e.target.value)
    filterServers(filterStr, e.target.value)
  }

  if (error) return error
  if (data.length < 1 || loader) return <Loader />

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
