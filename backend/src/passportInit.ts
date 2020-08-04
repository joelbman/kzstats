import passport from 'passport'
import { Strategy } from 'passport-steam'
import { production, STEAM_API_KEY } from './util/secrets'

const realm = production ? 'https://kzstats.com/' : 'https://localhost/'
const returnURL = production
  ? 'https://kzstats.com/api/auth/return/'
  : 'https://localhost/api/auth/return/'

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
    (
      identifier: Record<string, unknown>,
      profile: Record<string, unknown>,
      done: unknown
    ) => {
      process.nextTick(() => {
        // ...
      })
    }
  )
)

export default passport
