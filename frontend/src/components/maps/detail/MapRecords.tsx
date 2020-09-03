import Table from 'components/general/Table'
import { ModeContext } from 'context/ModeContext'
import useApiRequest from 'hooks/useApiRequest'
import Record from 'models/Record'
import React, { useContext, useMemo, useState } from 'react'

interface Props {
  mapname: string
}

const MapRecords = (props: Props) => {
  const [records, setRecords] = useState<Record[]>([])
  const [proOnly, setProOnly] = useState(false)
  const { state: modeState } = useContext(ModeContext)
  const [apiOpt, setApiOpt] = useState({
    map_name: props.mapname,
    limit: 100,
    modes_list_string: modeState.kzMode,
    tickrate: modeState.tickrate,
    has_teleports: false,
    stage: 0,
  })
  const [apiOptTp, setApiOptTp] = useState({
    map_name: props.mapname,
    limit: 100,
    modes_list_string: modeState.kzMode,
    tickrate: modeState.tickrate,
    has_teleports: true,
    stage: 0,
  })

  const { error, loader, data } = useApiRequest(
    'records/top/',
    apiOpt,
    false,
    true
  )

  const { loader: tpLoader, data: tpData } = useApiRequest(
    'records/top/',
    apiOptTp,
    false,
    true
  )

  useMemo(() => {
    if (tpData && data) setRecords(data.concat(tpData))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, tpData])

  useMemo(() => {
    setApiOpt({
      ...apiOpt,
      modes_list_string: modeState.kzMode,
      tickrate: modeState.tickrate,
    })
    setApiOptTp({
      ...apiOptTp,
      modes_list_string: modeState.kzMode,
      tickrate: modeState.tickrate,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeState.kzMode, modeState.tickrate])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setRecords(data)
    } else setRecords(data.concat(tpData))

    setProOnly(e.target.checked)
  }

  const columns = [
    { key: 'player_name', header: 'Player', type: 'player' },
    { key: 'time', type: 'runtime' },
    { key: 'points', type: 'points' },
    { key: 'teleports', header: 'TPs' },
    { key: 'updated_on', type: 'datetime', header: 'Date' },
    { key: 'server_name', type: 'server', header: 'Server' },
  ]

  if (error) return error
  if (loader || tpLoader) return loader || tpLoader

  return (
    <div>
      <h1>Records</h1>
      <div className="my-4 ml-1">
        Show only PRO times:
        <input type="checkbox" checked={proOnly} onChange={handleInput} />
      </div>
      {records.length > 0 ? (
        <Table
          data={records}
          columns={columns}
          sort={{ key: 'time', desc: false }}
          itemsPerPage={20}
        />
      ) : (
        <p>No records found</p>
      )}
    </div>
  )
}

export default MapRecords
