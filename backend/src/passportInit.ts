import passport from 'passport'
import { Strategy } from 'passport-steam'
import { production, STEAM_API_KEY } from './util/secrets'
import { db } from './db/db'
import logger from './util/logger'

const realm = production ? 'https://kzstats.com/' : 'https://localhost:3001/'
const returnURL = production
  ? 'https://kzstats.com/api/auth/return/'
  : 'https://localhost:3001/api/auth/return/'

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

passport.use(
  new Strategy(
    {
      returnURL: returnURL,
      realm: realm,
      apiKey: STEAM_API_KEY,
    },
    (identifier: any, profile: any, done: any) => {
      process.nextTick(() => {
        return db('kzstats_user')
          .where('steamid64', profile.id)
          .then((data) => {
            let userObj

            // Handle new users
            if (data.length === 0) {
              let country = ''
              const countryCode = profile._json.locCountryCode
              if (countryCode) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const countryCodes = require('./util/countrycodes.json')
                country = countryCodes[countryCode]
              }

              userObj = {
                steamid64: profile.id,
                alias: profile._json.displayName,
                countrycode: countryCode,
                country: country,
              }
              return db('kzstats_user').insert(userObj)
            }
            // Handle existing users
            else {
              userObj = data[0]
            }

            profile.userObj = userObj
            profile.identifier = identifier
            return done(null, profile)
          })
          .catch((e: Error) => {
            logger.error(e.message)
          })
      })
    }
  )
)

export default passport
