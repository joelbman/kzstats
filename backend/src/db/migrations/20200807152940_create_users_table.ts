import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('kzstats_user', function (table) {
    table.increments()
    table.string('steamid64', 20).notNullable()
    table.string('steamid32', 30).nullable()
    table.string('country', 50).nullable()
    table.string('countrycode', 5).nullable()
    table.string('alias', 50).nullable()
    table.boolean('admin').defaultTo(false)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('person')
}
