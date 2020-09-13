import Gamedig, { Player } from 'gamedig'
import { db } from 'db/db'
import logger from 'util/Logger'
import * as continentCodes from 'data/continentcodes.json'

let currentList = [],
  errorList = [],
  tempList = []

interface ServerObject {
  ip: string
  port: number
  name: string
  map: string
  maxplayers: number
  countrycode: string
  continentcode?: string
  id?: number
  errorcount?: number
  players: Player[]
  numplayers: number
}

const ServerListTask = (): void => {
  const queryServer = async (server: ServerObject): Promise<string> => {
    let state: Gamedig.QueryResult
    try {
      state = await Gamedig.query({
        type: 'csgo',
        host: server.ip,
        port: server.port,
      })
    } catch (e) {
      errorList.push(server.id)
      return
    }

    const serverObj = <ServerObject>{}

    // workaround for workshop mapnames
    const mapName = state.map.split('/')[state.map.split('/').length - 1]

    serverObj.ip = server.ip
    serverObj.port = server.port
    serverObj.name = state.name
    serverObj.map = mapName
    serverObj.maxplayers = state.maxplayers
    serverObj.numplayers = state.players.length + state.bots.length
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

      await db('kzstats_server')
        .where('id', server.id)
        .update({ continentcode: serverObj.continentcode })
    }

    if (server.errorcount > 0) {
      await db('kzstats_server')
        .where('id', server.id)
        .update({ errorcount: 0 })
    }

    tempList.push(serverObj)
  }

  const updateList = async (): Promise<void> => {
    const data = await db('kzstats_server').where('disabled', '=', false)

    errorList = []
    tempList = []

    const promises = data.map((server) => {
      return queryServer(server)
    })

    Promise.all(promises).then(() => {
      if (tempList.length > 3) currentList = tempList

      updateErrors().catch((e) => logger.error(e.message))

      console.log(
        `Server list refreshed, online: ${currentList.length} | offline: ${errorList.length}`
      )

      setTimeout(updateList, 120000)
    })
  }

  const updateErrors = async (): Promise<void> => {
    const rows = await db('kzstats_server')
      .whereIn('id', errorList)
      .increment('errorcount', 1)

    if (rows < 1) return
    const disableCount = await db('kzstats_server')
      .where('errorcount', '>', 2000)
      .andWhere('disabled', '=', false)
      .update({ disabled: true })

    if (disableCount > 0) console.log(`Disabled ${disableCount} servers`)
  }

  updateList().catch((e) => logger.error(e.message))
}

export { ServerListTask, currentList }
