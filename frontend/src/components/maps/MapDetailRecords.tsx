import React, { useContext, useState } from 'react'
import useApiRequest from '../util/useApiRequest'
import { ModeContext } from '../../context/ModeContext'
import Table from '../general/Table'
import Record from '../../models/Record'
import RunTimeFormatter from '../util/RunTimeFormatter'

interface Props {
  mapname: string
}

const MapDetailRecords = ({ mapname }: Props) => {
  const { modeContextState } = useContext(ModeContext)
  const [apiOptions, setApiOptions] = useState({
    limit: 50,
    map_name: mapname,
    modes_list_string: modeContextState.kzMode,
    tickrate: modeContextState.tickrate,
  })
  const { error, isLoaded, data } = useApiRequest('records/top', apiOptions)

  if (error && error.message) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>

  return (
    <div>
      <Table>
        {data.map((r: Record, i: number) => (
          <tr>
            <td>{i + 1}</td>
            <td>{r.player_name}</td>
            <td>
              <RunTimeFormatter time={r.time} />
            </td>
            <td>{r.updated_on.replace('T', ' ')}</td>
            <td>{r.server_name}</td>
          </tr>
        ))}
      </Table>
    </div>
  )
}

export default MapDetailRecords
