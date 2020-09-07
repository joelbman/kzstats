import { PassportSteamProfile, UserObject } from 'types'
import { db } from '../db/db'

const AuthService = {
  editProfile: async (
    profile: PassportSteamProfile,
    body: UserObject
  ): Promise<number> => {
    const data = await db('kzstats_user')
      .where('steamid64', '=', profile.id)
      .update({ alias: body.alias, countrycode: body.countrycode })
    return data
  },

  handleLogin: async (profile: PassportSteamProfile): Promise<UserObject> => {
    const data = await db('kzstats_user').where('steamid64', profile.id)
    if (data.length > 0) return data[0]

    let country = ''

    const countryCode = profile._json?.loccountrycode
    if (countryCode) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const countryCodes = require('./util/countrycodes.json')
      country = countryCodes[countryCode]
    }

    const userObj = {
      steamid64: profile.id,
      alias: profile.displayName,
      countrycode: countryCode,
      country: country,
    }
    await db('kzstats_user').insert(userObj)
    return userObj
  },
}

export default AuthService
