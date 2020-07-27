import React, { useState, useEffect } from 'react'
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
    '/jumpstats/' + jumpType + '/top',
    apiOptions
  )

  useEffect(() => {
    if (data.length > 0) {
      setApiOptions({ is_crouch_bind: crouchBind, limit: 20 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crouchBind])

  if (error) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div>Loading...</div>
  return (
    <table className="w-full mt-10">
      <thead className="w-full bg-gray-900 text-left">
        <tr>
          <th>#</th>
          <th>Player</th>
          <th>Strafes</th>
          <th>Distance</th>
          <th>Date</th>
          <th>Server</th>
        </tr>
      </thead>
      <tbody>
        {data.map((jumpstat: Jumpstat, key: number) => (
          <tr className="w-full bg-gray-800 text-left" key={key}>
            <td>{key + 1}.</td>
            <td>{jumpstat.player_name}</td>
            <td>{jumpstat.strafe_count}</td>
            <td>{jumpstat.distance}</td>
            <td>{jumpstat.updated_on.replace('T', ' ')}</td>
            <td>{jumpstat.server_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default JumpStatTable
