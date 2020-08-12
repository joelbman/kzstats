import passport from 'passport'
import { Strategy } from 'passport-steam'
import { DoneFunction, PassportSteamProfile, UserObject } from 'types'
import AuthService from './services/AuthService'
import { STEAM_API_KEY, production } from './util/config'
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
    (identifier: string, profile: PassportSteamProfile, done: DoneFunction) => {
      process.nextTick(() => {
        AuthService.handleLogin(profile)
          .then((userObj: UserObject) => {
            profile.userObj = userObj
            profile.identifier = identifier
            return done(null, profile)
          })
          .catch((e: Error) => {
            logger.error(e.message)
            return done(null, profile)
          })
      })
    }
  )
)

export default passport
