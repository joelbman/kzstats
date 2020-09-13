import { db } from 'db/db'
import { globalAPI } from 'util/API'

interface WorldRecord {
  id: number
  map_id: number
  map_name: string
  time: number
  mode: string
  tickrate: number
  updated_on: string
  teleports: number
  server_id: number
  server_name: string
  steamid64: string
  player_name: string
  timediff: number
  duration: number
}

const insertOrUpdate = (records: WorldRecord[]) => {
  return db.transaction((trx) => {
    const queries = records.map((obj) => {
      const insert = trx('kzstats_world_records').insert(obj).toString()
      const update = trx('kzstats_world_records')
        .update(obj)
        .toString()
        .replace(/^update(.*?)set\s/gi, '')
      return trx
        .raw(`${insert} ON DUPLICATE KEY UPDATE ${update}`)
        .transacting(trx)
    })
    return Promise.all(queries).then(trx.commit).catch(trx.rollback)
  })
}

const RecordService = {
  updateMapRecords: async (
    mapname: string,
    mode: string,
    tickrate: string
  ): Promise<void> => {
    const latest = await globalAPI.get('/records/top/recent', {
      params: {
        limit: 100,
        place_top_at_least: 1,
        has_teleports: false,
        tickrate: tickrate,
        map_name: mapname,
        modes_list_string: mode,
        stage: 0,
      },
    })

    if (latest.data.length === 0) return

    const localData = await db('kzstats_world_records')
      .where({
        map_name: mapname,
        mode: mode,
        tickrate: tickrate,
      })
      .orderBy('updated_on', 'desc')

    latest.data.sort((a: WorldRecord, b: WorldRecord) => {
      return b.time - a.time
    })

    if (
      Date.parse(localData[0]?.updated_on) ===
        Date.parse(latest.data[0].updated_on) &&
      localData.length === latest.data.length
    ) {
      return
    }

    let prevTime, prevUpd
    const records = latest.data.map((r: WorldRecord) => {
      // Handle invalid API responses
      if (r.map_name !== mapname) throw new Error('INVALID_API_RESPONSE')

      const timediff = prevTime ? prevTime - r.time : null
      const duration = prevUpd
        ? Date.parse(r.updated_on) / 1000 - prevUpd
        : null
      prevUpd = Date.parse(r.updated_on) / 1000
      prevTime = r.time

      return {
        id: r.id,
        map_id: r.map_id,
        map_name: r.map_name,
        time: r.time,
        mode: r.mode,
        tickrate: r.tickrate,
        updated_on: r.updated_on,
        teleports: r.teleports,
        server_id: r.server_id,
        server_name: r.server_name,
        steamid64: r.steamid64,
        player_name: r.player_name,
        timediff: timediff,
        duration: duration,
      }
    })

    if (localData.length === 0) {
      await db('kzstats_world_records').insert(records)
    } else if (
      Date.parse(localData[0].updated_on) < Date.parse(records[0].updated_on)
    ) {
      const newRecords = await insertOrUpdate(records)
      return newRecords
    }
  },
}

export default RecordService
