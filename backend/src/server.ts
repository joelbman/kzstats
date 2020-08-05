import * as https from 'https'

import { SESSION_SECRET } from './util/secrets'
import bodyParser from 'body-parser'
import express from 'express'
import passport from './passportInit'
import path from 'path'
import { readFileSync } from 'fs'
import session from 'express-session'

const app = express()

app.set('port', process.env.PORT || 62513)
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

const options = {
  key: readFileSync(path.join(process.cwd() + '/../ssl/key.key')),
  cert: readFileSync(path.join(process.cwd() + '/../ssl/cert.crt')),
}
https.createServer(options, app).listen(62513, () => {
  console.log('Server started')
})
