import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('kzstats_user', function (table) {
    table.increments()
    table.string('steamid64', 20).notNullable().unique()
    table.string('country', 50).nullable()
    table.string('countrycode', 5).nullable()
    table.string('alias', 50).nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return
}
