import * as https from 'https'

import { SESSION_SECRET } from './util/secrets'
import bodyParser from 'body-parser'
import express from 'express'
import passport from './passportInit'
import path from 'path'
import { readFileSync } from 'fs'
import session from 'express-session'
import router from './router'

const app = express()

const httpsOptions = {
  key: readFileSync(path.join(process.cwd() + '/../ssl/key.key')),
  cert: readFileSync(path.join(process.cwd() + '/../ssl/cert.crt')),
}

app.set('port', process.env.PORT || 3001)
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

app.use(function (req, res, next) {
  res.contentType('application/json')
  next()
})
app.use('/api', router)

https.createServer(httpsOptions, app).listen(app.get('port'), () => {
  console.log('Server started')
})
