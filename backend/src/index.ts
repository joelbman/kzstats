// eslint-disable-next-line @typescript-eslint/no-var-requires
const moduleAlias = require('module-alias')
moduleAlias.addPath(__dirname)

import { readFileSync } from 'fs'
import * as http from 'http'
import * as https from 'https'
import path from 'path'
import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import mysql from 'mysql'
import passport from 'util/PassportConfig'
import router from './Router'
import { config } from './db/db'
import DiscordBotTask from './tasks/DiscordBotTask'
import { ServerListTask } from './tasks/ServerListTask'
import { SESSION_SECRET, production } from './util/Config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MySQLStore = require('express-mysql-session')(session)

const options = {
  host: config.connection.host,
  user: config.connection.user,
  password: config.connection.password,
  database: config.connection.database
}

const connection = mysql.createPool(options)
const store = new MySQLStore({ schema: { tableName: 'kzstats_session' }}, connection)

const app = express()
app.set('port', process.env.PORT || 3001)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store,
  })
)

app.use(passport.initialize())
app.use(passport.session())

let server: http.Server | https.Server
if (production) {
  app.use('/', router)
  server = http.createServer(app)
} else {
  app.use('/api', router)
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

ServerListTask()
DiscordBotTask()
