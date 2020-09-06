import { readFileSync } from 'fs'
import * as http from 'http'
import * as https from 'https'
import path from 'path'
import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import passport from './passportInit'
import router from './router'
import ServerListTask from './tasks/ServerListTask'
import { SESSION_SECRET, production } from './util/config'

const app = express()
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
app.use('/', router)

let server: http.Server | https.Server
if (production) {
  server = http.createServer(app)
} else {
  server = https.createServer(
    {
      key: readFileSync(path.join(process.cwd() + '/../ssl/key.key')),
      cert: readFileSync(path.join(process.cwd() + '/../ssl/cert.crt')),
    },
    app
  )
}

server.listen(app.get('port'), () => {
  console.log(`Server running on: ${app.get('port')}`)
})

// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io').listen(server)

ServerListTask(io)
