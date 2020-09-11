import Table from 'components/general/Table'
import useApiRequest from 'hooks/useApiRequest'
import React, { useMemo, useState } from 'react'

interface Props {
  has_teleports?: boolean
  mode: number
  tickrate: string
}

const PlayersTopRanks = (props: Props) => {
  const [apiParams, setApiParams] = useState({
    finishes_greater_than: 0,
    stages: 0,
    mode_ids: props.mode,
    tickrates: props.tickrate,
    has_teleports: props.has_teleports,
    mapTag: 'overall',
    limit: 30,
  })
  const { error, loader, data } = useApiRequest(
    '/player_ranks',
    apiParams,
    false,
    true
  )

  useMemo(() => {
    setApiParams({
      ...apiParams,
      mode_ids: props.mode,
      tickrates: props.tickrate,
      has_teleports: props.has_teleports,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mode, props.tickrate, props.has_teleports])

  if (loader) return loader
  if (error) return error

  return (
    <div className="flex-grow" style={{ maxWidth: '490px' }}>
      <h3>Top 30 - Points</h3>
      <Table
        data={data}
        columns={[
          { key: 'player_name', type: 'player', header: 'Player' },
          { key: 'points' },
          { key: 'finishes' },
          { key: 'average' },
        ]}
        sort={{ key: 'points', desc: true }}
      />
    </div>
  )
}

export default PlayersTopRanks
