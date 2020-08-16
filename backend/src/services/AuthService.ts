import { PassportSteamProfile, UserObject } from 'types'
import { db } from '../db/db'

const AuthService = {
  editProfile: (
    profile: PassportSteamProfile,
    body: UserObject
  ): Promise<void> => {
    return db('kzstats_user')
      .where('steamid64', '=', profile.id)
      .update({ alias: body.alias, countrycode: body.countrycode })
      .then((data) => {
        return console.log(data)
      })
  },

  handleLogin: (profile: PassportSteamProfile): Promise<UserObject> => {
    return db('kzstats_user')
      .where('steamid64', profile.id)
      .then((data) => {
        let userObj = {}
        // Handle new users
        if (data.length === 0) {
          let country = ''
          const countryCode = profile._json.loccountrycode
          if (countryCode) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const countryCodes = require('./util/countrycodes.json')
            country = countryCodes[countryCode]
          }

          userObj = {
            steamid64: profile.id,
            alias: profile.displayName,
            countrycode: countryCode,
            country: country,
          }
          return db('kzstats_user')
            .insert(userObj)
            .then(() => {
              return userObj
            })
        }
        // Handle existing users
        else {
          return data[0]
        }
      })
  },
}

export default AuthService
