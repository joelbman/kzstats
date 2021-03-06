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
  tick: number
}

const ServerListView = () => {
  const timer = useRef(0)
  const [filtered, setFiltered] = useState<ServerObject[]>([])
  const [continent, setContinent] = useState('')
  const [filterStr, setFilterStr] = useState('')
  const [tickrate, setTickrate] = useState('128')

  const { error, loader, data } = useApiRequest('/server/', null, true)

  const filterServers = (filter: string, continent: string, tickrate: string, serverlist?: ServerObject[]) => {
    const server_arr = serverlist ? serverlist : (data as ServerObject[])

    let arr = []
    if (filter.length > 2) {
      arr = server_arr.filter((s) => {
        return s.map.toLowerCase().includes(filter) || s.name.toLowerCase().includes(filter)
      })
    } else arr = server_arr

    if (continent.length === 2) {
      arr = arr.filter((s) => {
        return s.continentcode === continent
      })
    }

    if (tickrate.length > 1) {
      arr = arr.filter((s) => {
        return s.tick.toString() === tickrate
      })
    }

    arr.sort((a, b) => {
      return b.numplayers - a.numplayers
    })

    setFiltered(arr)
  }

  useEffect(() => {
    filterServers(filterStr, continent, tickrate, data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStr, continent, data])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer.current)
    const val = e.target.value.toLowerCase()
    timer.current = window.setTimeout(() => {
      setFilterStr(val)
      filterServers(val, continent, tickrate)
    }, 600)
  }

  if (error) return error
  if (data.length < 1 || loader) return <Loader />

  return (
    <div>
      <h1>Servers</h1>
      <Helmet title="Servers" />
      <section className="mb-4 flex flex-wrap">
        <div className="mr-4">
          <label htmlFor="namefilter">Filter</label>
          <input type="text" className="ml-2" placeholder="Server name, map name..." maxLength={20} onChange={handleInput} id="namefilter" />
        </div>
        <div className="mt-2 mr-4 md:mt-0">
          <label htmlFor="continent">Continent</label>
          <select
            className="ml-2"
            onChange={(e) => {
              setContinent(e.target.value)
              filterServers(filterStr, e.target.value, tickrate)
            }}
            value={continent}
            id="continentSelect"
          >
            <option value="">World</option>
            <option value="EU">Europe</option>
            <option value="NA">North America</option>
            <option value="SA">South America</option>
            <option value="AS">Asia</option>
            <option value="OC">Oceania</option>
            <option value="AF">Africa</option>
          </select>
        </div>
        <div className="mt-2 md:mt-0">
          <label htmlFor="tickrate">Tickrate:</label>
          <select
            value={tickrate}
            onChange={(e) => {
              setTickrate(e.target.value)
              filterServers(filterStr, continent, e.target.value)
            }}
          >
            <option value="">All</option>
            <option value="128">128</option>
            <option value="102">102</option>
            <option value="64">64</option>
          </select>
        </div>
      </section>
      {filtered.length > 0 ? (
        <TableSimple headers={['Server', 'Map', 'Players', 'IP', ' ']}>
          {filtered.map((server: ServerObject, i: number) => (
            <tr key={i}>
              <td>
                <Link to={`/servers/${server.ip}:${server.port}`}>{server.name}</Link>
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
