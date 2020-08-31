import Table from 'components/general/Table'
import useApiRequest from 'components/util/useApiRequest'
import { ModeContext } from 'context/ModeContext'
import React, { useContext, useEffect, useMemo, useState } from 'react'

interface Props {
  steamid64: string
}

const PlayerRecords = (props: Props) => {
  const { state: modeState } = useContext(ModeContext)

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

  const handleInput = () => {}

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
          <div className="mt-2 mb-4">
            Mapname:
            <input
              type="text"
              onChange={handleInput}
              maxLength={20}
              className="w-40"
            />
          </div>

          <Table
            data={data}
            columns={columns}
            sort={{ key: 'updated_on', desc: true }}
            itemsPerPage={20}
            className="w-full"
          />
        </>
      ) : (
        <p>No records found.</p>
      )}
    </div>
  )
}

export default PlayerRecords
