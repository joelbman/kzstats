import Knex from 'knex'

export const config = {
  client: 'mysql',
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'kzstats_knex_migrations',
  },
}

const knex = Knex(config as Knex.Config)
export const db = knex
