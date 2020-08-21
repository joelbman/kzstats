import Table from 'components/general/Table'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useApiRequest from '../util/useApiRequest'

interface Props {
  jumpType: string
  crouchBind: boolean
}

interface Jumpstat {
  id: number
  server_id: number
  steamid64: string
  jumpstat_data_id: number
  player_name: string
  steam_id: string
  jump_type: number
  distance: number
  json_jump_info: string
  tickrate: number
  msl_count: number
  strafe_count: number
  is_crouch_bind: number
  is_forward_bind: number
  is_crouch_boost: number
  updated_by_id: number
  created_on: string
  updated_on: string
}

const JumpStatTable = ({ jumpType, crouchBind }: Props) => {
  const [apiOptions, setApiOptions] = useState({
    is_crouch_bind: crouchBind,
    limit: 20,
  })
  const { error, isLoaded, data } = useApiRequest(
    `/jumpstats/${jumpType}/top`,
    apiOptions
  )

  useEffect(() => {
    if (data.length > 0) {
      setApiOptions({ is_crouch_bind: crouchBind, limit: 20 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crouchBind])

  if (error) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>

  return (
    <Table
      headers={['#', 'Player', 'Strafes', 'Distance', 'Date']}
      className="w-full mt-6"
    >
      {data.map((jumpstat: Jumpstat, key: number) => (
        <tr key={key}>
          <td>{key + 1}.</td>
          <td>
            <Link to={`/players/${jumpstat.steamid64}`}>
              {jumpstat.player_name}
            </Link>
          </td>
          <td>{jumpstat.strafe_count}</td>
          <td>{jumpstat.distance}</td>
          <td>{jumpstat.updated_on.replace('T', ' ')}</td>
        </tr>
      ))}
    </Table>
  )
}
export default JumpStatTable
