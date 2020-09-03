import Table from 'components/general/Table'
import { ModeContext } from 'context/ModeContext'
import useApiRequest from 'hooks/useApiRequest'
import React, { useContext, useMemo, useState } from 'react'

interface Props {
  steamid64: string
}

let timer = 0

const PlayerRecords = (props: Props) => {
  const { state: modeState } = useContext(ModeContext)
  const [nameFilter, setNameFilter] = useState('')
  const [pointsFilter, setPointsFilter] = useState('')
  const [apiOptions, setApiOptions] = useState({
    steamid64: props.steamid64,
    modes_list_string: modeState.kzMode,
    tickrate: modeState.tickrate,
    limit: 2000,
  })
  const { error, loader, data } = useApiRequest('records/top/', apiOptions)

  useMemo(() => {
    setApiOptions({
      ...apiOptions,
      modes_list_string: modeState.kzMode,
      tickrate: modeState.tickrate,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeState.kzMode, modeState.tickrate])

  const columns = [
    { key: 'map_name', type: 'map', header: 'Map' },
    { key: 'time', type: 'runtime' },
    { key: 'points', type: 'points' },
    { key: 'teleports', header: 'TPs' },
    { key: 'updated_on', type: 'datetime', header: 'Date' },
    { key: 'server_name', type: 'server', header: 'Server' },
  ]

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer)
    const val = e.target.value
    timer = window.setTimeout(() => {
      setNameFilter(val)
    }, 600)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPointsFilter(e.target.value)
  }

  if (error) return error
  if (loader) return loader

  return (
    <div>
      <h2>
        Records
        <small className="ml-2">({data.length} total)</small>
      </h2>

      {data.length > 0 ? (
        <>
          <div className="mt-2 mb-4 w-full">
            <div className="inline-block mr-4">
              Mapname
              <input
                type="text"
                onChange={handleInput}
                maxLength={20}
                className="w-40"
              />
            </div>
            <div className="inline-block">
              Points{' '}
              <select onChange={handleSelect}>
                <option value="">All</option>
                <option value="gold">WR (1000)</option>
                <option value="silver">Silver (900-999)</option>
                <option value="bronze">Bronze (750-899)</option>
                <option value="rest">Rest (0-749)</option>
              </select>
            </div>
          </div>

          <Table
            data={data}
            columns={columns}
            sort={{ key: 'updated_on', desc: true }}
            itemsPerPage={40}
            className="w-full"
            filters={[
              { key: 'map_name', value: nameFilter },
              { key: 'points', value: pointsFilter },
            ]}
          />
        </>
      ) : (
        <p>No records found.</p>
      )}
    </div>
  )
}

export default PlayerRecords
