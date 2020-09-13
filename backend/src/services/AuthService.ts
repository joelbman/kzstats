import { db } from 'db/db'
import { PassportSteamProfile, UserObject } from 'types'

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
    
    // Existing users
    if (data.length === 1) {
      const adminQuery = await db('kzstats_admin').where('steamid64', profile.id)
      if (adminQuery.length === 1) return {...data[0], admin: true }
      else return data[0]
    }

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
