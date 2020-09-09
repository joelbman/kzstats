import {db} from '../db/db'
import {convertSteamId} from '../services/PlayerService'

// This was used to transfer player data from the old KZTimer style table to the new user table

const SyncProfiles = async (): Promise<void> => {
  const oldPlayers = await db('kzstats_player').limit(20000)
  const convertedOld = oldPlayers.map((c) => { return { steamid64: convertSteamId(c.steamid), country: c.country, countrycode: c.countrycode, alias: c.name } })
  await db.raw(db('kzstats_user').insert(convertedOld).toString().replace(/^insert/i, 'insert ignore')).then(() => console.log('insert'))

}

SyncProfiles().then(() => {
  console.log('done')
  process.exit()
})