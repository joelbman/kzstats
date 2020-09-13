import passport from 'passport'
import { Strategy } from 'passport-steam'
import AuthService from 'services/AuthService'
import { DoneFunction, PassportSteamProfile, UserObject } from 'types'
import { BASEURL, STEAM_API_KEY } from './Config'
import logger from './Logger'

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

passport.use(
  new Strategy(
    {
      returnURL: BASEURL + 'api/auth/return/',
      realm: BASEURL,
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
