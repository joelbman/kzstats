import Table from 'components/general/Table'
import React, { useContext, useEffect, useState } from 'react'
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
  const [apiOptions] = useState({
    steamid64: props.steamid64,
    modes_list_string: modeState.kzMode,
  })
  const { error, isLoaded, data } = useApiRequest('/records/top/', apiOptions)
  const [records, setRecords] = useState<Record[]>([])

  useEffect(() => {
    setRecords(
      data
        .sort((a: Record, b: Record) => {
          return (
            new Date(a.updated_on).getTime() - new Date(b.updated_on).getTime()
          )
        })
        .reverse()
    )
  }, [data])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) setRecords(data)
    setRecords(
      data.filter((r: Record) => {
        return r.map_name.includes(e.target.value)
      })
    )
  }

  if (error && error.message) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>

  return (
    <div>
      <h2>Records</h2>
      Mapname:{' '}
      <input
        type="text"
        onChange={handleInput}
        maxLength={20}
        className="w-40"
      />
      {records.length > 0 ? (
        <Table
          headers={['Mapname', 'Runtime', 'Teleports', 'Date', 'Server']}
          className="mt-4 w-full"
        >
          {records.map((r: Record, i: number) => (
            <tr key={i}>
              <td>
                <Link to={`/maps/${r.map_name}`}>
                  {r.map_name ? r.map_name : '<unknown>'}
                </Link>
              </td>
              <td>
                <RunTimeFormatter time={r.time} />
              </td>
              <td>{r.teleports}</td>
              <td>{r.updated_on.replace('T', ' ')}</td>
              <td>{r.server_name}</td>
            </tr>
          ))}
        </Table>
      ) : (
        <p className="mt-4">No records found.</p>
      )}
    </div>
  )
}

export default PlayerRecords
