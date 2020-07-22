import express from 'express'
import passport from 'passport'
import session from 'express-session'
import bodyParser from 'body-parser'
import { SESSION_SECRET } from './util/secrets'

const app = express()

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.listen(app.get('port'), () =>
  console.log(`Listening on ${app.get('port')}`)
)
