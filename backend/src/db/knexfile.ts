import { db } from '../util/secrets'

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: db.name,
      user: db.user,
      password: db.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'kzstats_knex_migrations',
    },
  },
}
