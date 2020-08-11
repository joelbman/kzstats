import React, { useContext, useEffect, useState } from 'react'
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
  })
  const { error, isLoaded, data } = useApiRequest('/records/top/', apiOptions)
  const [records, setRecords] = useState<Record[]>([])

  useEffect(() => {
    setRecords(data)
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
      Mapname: <input type="text" onChange={handleInput} />
      {records.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Mapname</th>
              <th>Runtime</th>
              <th>Date</th>
              <th>Server</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r: Record) => (
              <tr>
                <td>
                  <a href={`/maps/${r.map_name}`}>{r.map_name}</a>
                </td>
                <td>
                  <RunTimeFormatter time={r.time} />
                </td>
                <td>{r.updated_on}</td>
                <td>{r.server_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4">No records found.</p>
      )}
    </div>
  )
}

export default PlayerRecords
