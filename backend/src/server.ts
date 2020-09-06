import { readFileSync } from 'fs'
import * as https from 'https'
import path from 'path'
import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import passport from './passportInit'
import router from './router'
import LatestRecordsTask from './tasks/LatestRecordsTask'
import ServerListTask from './tasks/ServerListTask'
import { SESSION_SECRET } from './util/config'

const app = express()
app.set('port', process.env.PORT || 3001)

const options = {
  key: readFileSync(path.join(process.cwd() + '/../ssl/key.key')),
  cert: readFileSync(path.join(process.cwd() + '/../ssl/cert.crt')),
}

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
app.use('/api', router)

const server = https.createServer(options, app).listen(app.get('port'), () => {
  console.log(`Server running on: ${app.get('port')}`)
})

// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io').listen(server)

ServerListTask(io)
