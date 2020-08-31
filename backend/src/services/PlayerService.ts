import axios from 'axios'
import Integer from 'integer'
import { STEAM_API_KEY } from '../util/config'

const convertSteamId = (steamid64: string) => {
  const STEAM_BASELINE = Integer('76561197960265728')

  const y = Integer(steamid64).subtract(STEAM_BASELINE).divide(2)
  const x = Integer(steamid64).mod(2)

  return `STEAM_1:${x.toString()}:${y.toString()}`
}

const PlayerService = {
  getSteamProfile: (steamid64: string): Promise<string> => {
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamid64}`
    return axios.get(url).then((res) => {
      const profile = res.data.response.players[0]
      if (profile.loccountrycode) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const countries = require('../util/countrycodes.json')
        const country = countries[profile.loccountrycode]
        profile.country = country
      }
      profile.steamid32 = convertSteamId(steamid64)
      return profile
    })
  },
}

export default PlayerService
