/* eslint-disable react-hooks/exhaustive-deps */

import Table from 'components/general/Table'
import { TrophyIcon } from 'components/icons'
import { runtimeFormat, textLimiter } from 'components/util/filters'
import useApiRequest from 'components/util/useApiRequest'
import { ModeContext } from 'context/ModeContext'
import Record from 'models/Record'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'

interface Props {
  steamid64?: string
  mapname?: string
}

const RecordTable = (props: Props) => {
  let apiParams, tableHeaders
  const { state: modeState } = useContext(ModeContext)

  if (props.steamid64) {
    apiParams = {
      steamid64: props.steamid64,
      modes_list_string: modeState.kzMode,
      tickrate: modeState.tickrate,
      limit: 2000,
    }
    tableHeaders = ['Map', 'Runtime', 'Teleports', 'Date', 'Server']
  } else {
    apiParams = {
      limit: 200,
      map_name: props.mapname,
      modes_list_string: modeState.kzMode,
      tickrate: modeState.tickrate,
    }
    tableHeaders = ['#', 'Player', 'Runtime', 'Teleports', 'Date', 'Server']
  }

  const [apiOptions, setApiOptions] = useState(apiParams)
  const { error, isLoaded, data } = useApiRequest('/records/top/', apiOptions)
  const [records, setRecords] = useState<Record[]>([])
  const [currentRecords, setCurrentRecords] = useState<Record[]>([])

  const [offset, setOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const handlePageChange = (data: any) => {
    let offset = Math.ceil(data.selected * 20)
    if (records.length < 21) offset = 0
    setOffset(offset)
    setCurrentRecords(records.slice(offset, offset + 20))
  }

  // Default sorting upon recieving data
  useEffect(() => {
    const rec = data
      .sort((a: Record, b: Record) => {
        // Player view - sort by datetime
        if (props.steamid64) {
          return (
            new Date(a.updated_on).getTime() - new Date(b.updated_on).getTime()
          )
        }
        // Map view - sort by runtime
        return b.time - a.time
      })
      .reverse()
    setRecords(rec)
    setPageCount(Math.ceil(rec.length / 20))
    setCurrentRecords(rec.slice(offset, offset + 20))
  }, [data])

  // Handle mode/tickrate context changes
  useMemo(() => {
    setApiOptions({
      ...apiOptions,
      modes_list_string: modeState.kzMode,
      tickrate: modeState.tickrate,
    })
  }, [modeState.kzMode, modeState.tickrate])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) setRecords(data)
    setRecords(
      data.filter((r: Record) => {
        return r.map_name.includes(e.target.value)
      })
    )
    setPageCount(Math.ceil(records.length) / 20)
  }

  if (error?.message) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>

  return (
    <div>
      <h2>
        Records
        {props.steamid64 && (
          <small className="ml-2">({data.length} total)</small>
        )}
      </h2>
      {props.steamid64 && (
        <div className="mt-2 mb-4">
          Mapname:
          <input
            type="text"
            onChange={handleInput}
            maxLength={20}
            className="w-40"
          />
        </div>
      )}

      {records.length > 0 ? (
        <Table headers={tableHeaders} className="mt-4 w-full">
          {currentRecords.map((r: Record, i: number) => (
            <tr key={i}>
              <td>
                {props.steamid64 ? (
                  <Link to={`/maps/${r.map_name}`}>
                    {r.map_name ? r.map_name : '<unknown>'}
                  </Link>
                ) : (
                  <>{i + 1}.</>
                )}
              </td>
              {props.mapname && (
                <td>
                  <Link to={`/players/${r.steamid64}`}>
                    {r.player_name ? r.player_name : '<unknown>'}
                  </Link>
                </td>
              )}
              <td className={r.points === 1000 ? 'font-bold' : ''}>
                {r.points === 1000 ? <TrophyIcon /> : ''}
                {runtimeFormat(r.time)}
              </td>
              <td>{r.teleports}</td>
              <td>{r.updated_on.replace('T', ' ')}</td>
              <td>
                {r.server_name ? (
                  <Link to={`/servers/${r.server_id}`}>
                    {textLimiter(r.server_name)}
                  </Link>
                ) : (
                  '<not available>'
                )}
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <p className="mt-4">No records found.</p>
      )}
      {pageCount > 1 && (
        <div className="flex justify-center">
          <ReactPaginate
            previousLabel={'«'}
            nextLabel={'»'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={'pagination-container'}
            activeClassName={'pagination-active'}
          />
        </div>
      )}
    </div>
  )
}

export default RecordTable
