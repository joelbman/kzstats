/* eslint-disable react-hooks/exhaustive-deps */

import Table from 'components/general/Table'
import { TrophyIcon } from 'components/icons'
import TextLengthLimiter from 'components/util/TextLengthLimiter'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import { ModeContext } from '../../../context/ModeContext'
import Record from '../../../models/Record'
import RunTimeFormatter from '../../util/RunTimeFormatter'
import useApiRequest from '../../util/useApiRequest'

interface Props {
  steamid64: string
}

const PlayerRecords = (props: Props) => {
  const { state: modeState } = useContext(ModeContext)
  const [apiOptions, setApiOptions] = useState({
    steamid64: props.steamid64,
    modes_list_string: modeState.kzMode,
    tickrates: modeState.tickrate,
    limit: 2000,
  })
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

  useEffect(() => {
    const rec = data
      .sort((a: Record, b: Record) => {
        return (
          new Date(a.updated_on).getTime() - new Date(b.updated_on).getTime()
        )
      })
      .reverse()
    setRecords(rec)
    setPageCount(Math.ceil(rec.length / 20))
    setCurrentRecords(rec.slice(offset, offset + 20))
  }, [data])

  useMemo(() => {
    setApiOptions({
      steamid64: props.steamid64,
      modes_list_string: modeState.kzMode,
      tickrates: modeState.tickrate,
      limit: 2000,
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

  if (error && error.message) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>

  return (
    <div>
      <h2>
        Records <small>({data.length} total)</small>
      </h2>
      <div className="mt-2 mb-4">
        Mapname:
        <input
          type="text"
          onChange={handleInput}
          maxLength={20}
          className="w-40"
        />
      </div>

      {records.length > 0 ? (
        <Table
          headers={['Mapname', 'Runtime', 'Teleports', 'Date', 'Server']}
          className="mt-4 w-full overflow-x-scroll"
        >
          {currentRecords.map((r: Record, i: number) => (
            <tr key={i}>
              <td>
                {r.points === 1000 ? <TrophyIcon /> : ''}
                <Link to={`/maps/${r.map_name}`}>
                  {r.map_name ? r.map_name : '<unknown>'}
                </Link>
              </td>
              <td className={r.points === 1000 ? 'font-bold' : ''}>
                <RunTimeFormatter time={r.time} />
              </td>
              <td>{r.teleports}</td>
              <td>{r.updated_on.replace('T', ' ')}</td>
              <td>
                {r.server_name ? (
                  <Link to={`/servers/${r.server_id}`}>
                    <TextLengthLimiter content={r.server_name} />
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

export default PlayerRecords
