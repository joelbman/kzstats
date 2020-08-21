import Gamedig from 'gamedig'
import { db } from '../db/db'
import logger from '../util/logger'
import * as continentCodes from '../util/continentcodes.json'
import ioserver from 'socket.io'

const io = ioserver()

let currentList = [],
  errorList = [],
  tempList = []

interface ServerObject {
  name: string
  map: string
  maxplayers: number
  countrycode: string
  continentcode?: string
  players: Record<string, unknown>[]
}

const updateList = (): void => {
  db('kzstats_server')
    .where('disabled', '=', false)
    .then((data) => {
      errorList = []
      tempList = []

      const promises = data.map((server) => {
        return Gamedig.query({
          type: 'csgo',
          host: server.ip,
          port: server.port,
        })
          .then((state) => {
            const serverObj = <ServerObject>{}
            serverObj.name = state.name
            serverObj.map = state.map
            serverObj.maxplayers = state.maxplayers
            serverObj.players = state.players
            serverObj.countrycode = server.countrycode
            serverObj.continentcode = server.continentcode

            // Loop through object keys and set continent code if a match is found for the countrycode
            if (!server.continentcode) {
              Object.keys(continentCodes).some((key) => {
                if (key === serverObj.countrycode) {
                  serverObj.continentcode = continentCodes[key]
                  return true
                }
              })

              db('kzstats_server')
                .where('id', server.id)
                .update({ continentcode: serverObj.continentcode })
                .then(() => {
                  console.log(`Set continent code for: ${server.ip}`)
                })
            }

            if (server.errorcount > 0) {
              db('kzstats_server')
                .where('id', server.id)
                .update({ errorcount: 0 })
                .then(() => {
                  console.log(`Error count reset for: ${server.ip}`)
                })
            }

            tempList.push(serverObj)
          })
          .catch(() => {
            errorList.push(server.id)
          })
      })

      Promise.all(promises).then(() => {
        if (tempList.length > 3) currentList = tempList
        updateErrors()
        console.log(
          `Server list refreshed, online: ${currentList.length} | offline: ${errorList.length}`
        )
        setTimeout(updateList, 60000)
      })
    })
    .catch((error) => {
      logger.error(error.message)
    })
}

const updateErrors = (): void => {
  db('kzstats_server')
    .whereIn('id', errorList)
    .increment('errorcount', 1)
    .then((rows) => {
      if (rows < 1) return
      db('kzstats_server')
        .where('errorcount', '>', 20)
        .andWhere('disabled', '=', false)
        .update({ disabled: true })
        .then((affectedRows) => {
          if (affectedRows > 0) console.log(`Disabled ${affectedRows} servers`)
        })
    })
}

// Socket listener
io.on('connection', function (socket) {
  socket.on('request-list', function () {
    socket.emit('serverlist', currentList)
  })
})

export { updateList }
