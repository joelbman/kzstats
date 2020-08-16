import axios from 'axios'
import { STEAM_API_KEY } from '../util/config'

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
      return profile
    })
  },
}

export default PlayerService
