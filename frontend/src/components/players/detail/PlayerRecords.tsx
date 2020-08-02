import React, { useState, useContext, useEffect } from 'react'
import useApiRequest from '../../util/useApiRequest'
import { ModeContext } from '../../../context/ModeContext'
import Record from '../../../models/Record'
import RunTimeFormatter from '../../util/RunTimeFormatter'

interface Props {
  steamid64: string
}

const PlayerRecords = (props: Props) => {
  const { modeContextState: ctx } = useContext(ModeContext)
  const [apiOptions, setApiOptions] = useState({
    steamid64: props.steamid64,
    modes_list_string: ctx.kzMode,
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
      Filter mapname: <input type="text" onChange={handleInput} />
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
    </div>
  )
}

export default PlayerRecords
