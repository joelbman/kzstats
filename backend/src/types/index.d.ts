import { Player } from 'gamedig'

export interface PassportSteamProfile {
  provider: string
  _json: {
    loccountrycode: string
  }
  id: string
  displayName: string
  identifier: string
  photos: [
    {
      value: string
    },
    {
      value: string
    },
    {
      value: string
    }
  ]
  userObj: UserObject
}

export interface UserObject {
  alias?: string
  country?: string
  countrycode?: string
  updated_on?: string
  steamid64: string
}

export interface QueryState {
  name: string
  map: string
  maxplayers: number
  players: Player[]
}

export interface KZMap {
  id: 0
  name: string
  validated: boolean
  difficulty: number
  updated_on: string
  workshop_url: string
  download_url: string
}

export interface DoneFunction {
  (e: Error, profile: PassportSteamProfile): void
}
