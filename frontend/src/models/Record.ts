export default interface Record {
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
