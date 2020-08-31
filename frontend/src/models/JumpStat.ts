interface JumpStat {
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

export default JumpStat
