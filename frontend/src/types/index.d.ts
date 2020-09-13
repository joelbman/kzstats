// prettier-ignore
export interface JumpStat {
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

// prettier-ignore
export interface KZMap {
  id: number
  name: string
  filesize: number
  validated: boolean
  difficulty: number
  created_on: string
  updated_on: string
  approved_by: string
  workshop_url: string
  download_url: string
  replay_id: number
}

// prettier-ignore
export interface KZRecord {
  id: number
  steamid64: string
  player_name: string
  steam_id: string
  server_id: number
  map_id: number
  stage: number
  mode: string
  tickrate: number
  time: number
  teleports: number
  created_on: string
  updated_on: string
  updated_by: number
  place: number
  top_100: number
  top_100_overall: number
  server_name: string
  map_name: string
  points: number
  record_filter_id: number
  replay_id: number
  countrycode?: string
}

// prettier-ignore
export interface User {
  steamid64: string
  avatarSmall: string
  avatarMedium: string
  alias: string
  country?: string
  countrycode?: string
  admin?: boolean
}
