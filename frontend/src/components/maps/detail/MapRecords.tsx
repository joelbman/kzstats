import Table from 'components/general/Table'
import useApiRequest from 'components/util/useApiRequest'
import { ModeContext } from 'context/ModeContext'
import React, { useContext, useEffect, useState } from 'react'

interface Props {
  mapname: string
}

const MapRecords = (props: Props) => {
  const { state: modeState } = useContext(ModeContext)
  const [apiOpt, setApiOpt] = useState({
    map_name: props.mapname,
    limit: 400,
    modes_list_string: modeState.kzMode,
    tickrate: modeState.tickrate,
  })
  const { error, loader, data } = useApiRequest(
    'records/top/',
    apiOpt,
    false,
    true
  )

  useEffect(() => {
    setApiOpt({
      ...apiOpt,
      modes_list_string: modeState.kzMode,
      tickrate: modeState.tickrate,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeState.kzMode, modeState.tickrate])

  const columns = [
    { key: 'player_name', header: 'Player', type: 'player' },
    { key: 'time', type: 'runtime' },
    { key: 'points', type: 'points' },
    { key: 'teleports', header: 'TPs' },
    { key: 'updated_on', type: 'datetime', header: 'Date' },
    { key: 'server_name', type: 'server', header: 'Server' },
  ]

  if (error) return error
  if (loader) return loader

  return (
    <div>
      <h1>
        Records <small>({data.length})</small>
      </h1>
      {data.length > 0 ? (
        <Table
          data={data}
          columns={columns}
          sort={{ key: 'time', desc: false }}
        />
      ) : (
        <p>No records found</p>
      )}
    </div>
  )
}

export default MapRecords
