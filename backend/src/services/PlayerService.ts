import axios from 'axios'
import Integer from 'integer'
import { db } from '../db/db'
import { PassportSteamProfile, UserObject } from '../types'
import { STEAM_API_KEY } from '../util/Config'

// Convert 64-bit to 32-bit ID or vice versa
const convertSteamId = (steamid: string): string => {
  const STEAM_BASELINE = Integer('76561197960265728')

  //32->64
  if (steamid.includes(':')) {
    const split = steamid.split(':')
    const product = Integer(split[2].replace(/\D/g, '')).multiply(2)
    const sum = Integer(product).add(STEAM_BASELINE)
    return Integer(sum).add(split[1]).toString()
  }

  const y = Integer(steamid).subtract(STEAM_BASELINE).divide(2)
  const x = Integer(steamid).mod(2)

  return `STEAM_1:${x.toString()}:${y.toString()}`
}

const PlayerService = {
  getProfile: async (steamid64: string): Promise<string> => {
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamid64}`
    const res = await axios.get(url)
    const users = await db('kzstats_user').where('steamid64', '=', steamid64)
    const profile = res.data.response.players[0]
    const user = users[0]

    if (users.length > 0) {
      if (!users[0].alias || users[0].alias.includes('????')) {
        await db('kzstats_user').where('steamid64', '=', steamid64).update({ alias: profile.personaname })
      } else profile.personaname = user.alias
      profile.loccountrycode = user.countrycode
      profile.country = user.country
    } else if (profile.loccountrycode) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const countries = require('../util/countrycodes.json')
      const country = countries[profile.loccountrycode]
      profile.country = country
      await db('kzstats_user').insert({
        steamid64: steamid64,
        alias: profile.personaname,
        country: country,
        countrycode: profile.loccountrycode,
      })
    }

    profile.steamid32 = convertSteamId(steamid64)
    return profile
  },

  getDetails: async (steamIdList: string[]): Promise<Record<string, unknown>> => {
    const data = await db('kzstats_user')
      .select('country', 'countrycode', 'steamid64', 'alias')
      .whereIn('steamid64', steamIdList)
    const players = {}
    data.forEach((p) => {
      players[p.steamid64] = {
        country: p.country,
        countrycode: p.countrycode,
        alias: p.alias,
      }
    })
    return players
  },

  editProfile: async (profile: PassportSteamProfile, body: UserObject): Promise<number> => {
    const dateLimit = new Date()
    dateLimit.setDate(dateLimit.getDate() - 7)

    if (profile.userObj.updated_on > dateLimit.toISOString()) throw Error('INSUFFICIENT_WAIT_TIME')

    const newInfo = {
      alias: body.alias,
      countrycode: body.countrycode,
      country: body.country,
      updated_on: new Date().toISOString(),
    }

    const data = await db('kzstats_user').where('steamid64', '=', profile.id).update(newInfo)
    profile.userObj = Object.assign(profile.userObj, newInfo)

    return data
  },

  searchByName: async (name: string): Promise<UserObject[]> => {
    const data = await db('kzstats_user').where('alias', 'like', `%${name}%`).orderBy('alias')
    return data
  },

  getSteamid64: async (steamid: string): Promise<string> => {
    const id = `${steamid.substr(0, 1)}:${steamid.substr(1, 1)}:${steamid.substr(2)}`
    return convertSteamId(id)
  },
}

export { convertSteamId }
export default PlayerService
