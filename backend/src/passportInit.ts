import passport from 'passport'
import { Strategy } from 'passport-steam'
import { production, STEAM_API_KEY } from './util/secrets'
import { db } from './db/db'

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
          .then(function (data) {
            profile.data = data
            profile.identifier = identifier
            return done(null, profile)
          })
          .catch((e: Error) => {
            console.log(e.message)
          })
      })
    }
  )
)

export default passport
