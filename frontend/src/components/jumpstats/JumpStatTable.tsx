import Table from 'components/general/Table'
import React, { useMemo, useState } from 'react'
import useApiRequest from '../util/useApiRequest'

interface Props {
  jumpType: string
  crouchBind: boolean
  steamid?: string
}

const stringToId = (str: string) => {
  switch (str) {
    case 'longjump':
      return 1
    case 'bhop':
      return 2
    case 'multibhop':
      return 3
    case 'weirdjump':
      return 4
    case 'dropbhop':
      return 5
    case 'countjump':
      return 6
    case 'ladderjump':
      return 7
    default:
      return 0
  }
}

const JumpStatTable = (props: Props) => {
  let url, apiOpt, columns

  if (props.steamid) {
    url = '/jumpstats/'
    apiOpt = {
      jump_type: stringToId(props.jumpType),
      is_crouch_bind: props.crouchBind,
      limit: 30,
      steam_id: props.steamid,
    }
    columns = [
      { key: 'distance' },
      { key: 'strafe_count', header: 'Strafes' },
      { key: 'updated_on', type: 'datetime', header: 'Date' },
    ]
  } else {
    url = `/jumpstats/${props.jumpType}/top`
    apiOpt = { is_crouch_bind: props.crouchBind, jump_type: null, limit: 60 }
    columns = [
      { key: 'player_name', type: 'player', header: 'Player' },
      { key: 'distance' },
      { key: 'strafe_count', header: 'Strafes' },
      { key: 'updated_on', type: 'datetime', header: 'Date' },
    ]
  }

  const [apiOptions, setApiOptions] = useState<any>(apiOpt)
  const { error, loader, data } = useApiRequest(url, apiOptions, false, true)

  useMemo(() => {
    setApiOptions({
      ...apiOptions,
      jump_type: stringToId(props.jumpType),
      is_crouch_bind: props.crouchBind,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.crouchBind, props.jumpType])

  if (error) return error
  if (loader) return loader

  return (
    <Table
      data={data}
      columns={columns}
      sort={{ key: 'distance', desc: true }}
      className="mt-4"
    />
  )
}
export default JumpStatTable
