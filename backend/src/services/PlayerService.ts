import axios from 'axios'
import Integer from 'integer'
import { db } from '../db/db'
import { STEAM_API_KEY } from '../util/config'

// Convert 64-bit to 32-bit ID
const convertSteamId = (steamid64: string) => {
  const STEAM_BASELINE = Integer('76561197960265728')

  const y = Integer(steamid64).subtract(STEAM_BASELINE).divide(2)
  const x = Integer(steamid64).mod(2)

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
      profile.loccoutnrycode = user.countrycode
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

  getDetails: async (steamid64_list: string[]): Promise<any> => {
    const data = await db('kzstats_user')
      .select('country', 'countrycode', 'steamid64', 'alias')
      .whereIn('steamid64', steamid64_list)
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
}

export default PlayerService
