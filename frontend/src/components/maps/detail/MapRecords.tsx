import Table from 'components/general/Table'
import useApiRequest from 'hooks/useApiRequest'
import KZRecord from 'models/KZRecord'
import React, { useMemo, useState } from 'react'

interface Props {
  mapname: string
  modeState: { kzMode: string; tickrate: string }
  setWrCallBack(proWR: KZRecord | null, tpWR: KZRecord | null): void
}

const MapRecords = (props: Props) => {
  const [records, setRecords] = useState<KZRecord[]>([])
  const [proOnly, setProOnly] = useState(false)

  const [apiOpt, setApiOpt] = useState({
    map_name: props.mapname,
    limit: 100,
    modes_list_string: props.modeState.kzMode,
    tickrate: props.modeState.tickrate,
    has_teleports: false,
    stage: 0,
  })
  const [apiOptTp, setApiOptTp] = useState({
    map_name: props.mapname,
    limit: 100,
    modes_list_string: props.modeState.kzMode,
    tickrate: props.modeState.tickrate,
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
    if (tpData && data) {
      setRecords(data.concat(tpData))
      const proWR = data.find((r: KZRecord) => {
        return r.points === 1000
      })
      const tpWR = tpData.find((r: KZRecord) => {
        return r.points === 1000
      })
      props.setWrCallBack(proWR, tpWR)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, tpData])

  useMemo(() => {
    setApiOpt({
      ...apiOpt,
      modes_list_string: props.modeState.kzMode,
      tickrate: props.modeState.tickrate,
    })
    setApiOptTp({
      ...apiOptTp,
      modes_list_string: props.modeState.kzMode,
      tickrate: props.modeState.tickrate,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.modeState.kzMode, props.modeState.tickrate])

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
