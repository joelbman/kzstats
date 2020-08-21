import { readFileSync } from 'fs'
import * as https from 'https'
import path from 'path'
import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import passport from './passportInit'
import router from './router'
import { updateList } from './tasks/ServerListTask'
import { SESSION_SECRET } from './util/config'

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
app.use('/api', router)

updateList()

https.createServer(httpsOptions, app).listen(app.get('port'), () => {
  console.log('Server running on: ' + app.get('port'))
})
