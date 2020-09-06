import Knex from 'knex'
import { DB_CONFIG } from '../util/config'

export const config = {
  client: 'mysql',
  connection: {
    database: DB_CONFIG.name,
    user: DB_CONFIG.user,
    password: DB_CONFIG.password,
    host: DB_CONFIG.host,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'kzstats_knex_migrations',
  },
}

const knex: Knex = Knex(config as Knex.Config)
export const db = knex
