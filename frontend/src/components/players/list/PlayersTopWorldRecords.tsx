import Table from 'components/general/Table'
import useApiRequest from 'hooks/useApiRequest'
import React, { useMemo, useState } from 'react'

interface Props {
  has_teleports?: boolean
  mode: number
  tickrate: string
}

const PlayersTopWorldRecords = (props: Props) => {
  const [apiOptions, setApiOptions] = useState({
    stages: 0,
    limit: 30,
    mode_ids: props.mode,
    mapTag: 'overall',
    tickrates: props.tickrate,
    has_teleports: props.has_teleports,
  })
  const { error, loader, data } = useApiRequest(
    '/records/top/world_records',
    apiOptions,
    false,
    true
  )

  useMemo(() => {
    setApiOptions({
      ...apiOptions,
      mode_ids: props.mode,
      tickrates: props.tickrate,
      has_teleports: props.has_teleports,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mode, props.tickrate, props.has_teleports])

  const columns = [
    { key: 'player_name', type: 'player', header: 'Player' },
    { key: 'count' },
  ]

  return (
    <div className="mb-8 lg:mr-4 mr-2 flex-grow" style={{ maxWidth: '400px' }}>
      {error && error}
      {loader && loader}
      {data.length > 0 && (
        <div>
          <h3>Top 30 - World records</h3>
          <Table
            data={data}
            columns={columns}
            sort={{ key: 'count', desc: true }}
            className="w-full"
          />
        </div>
      )}
    </div>
  )
}

export default PlayersTopWorldRecords
