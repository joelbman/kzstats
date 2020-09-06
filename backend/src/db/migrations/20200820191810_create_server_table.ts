import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('kzstats_server', function (table) {
    table.increments()
    table.string('ip', 30).notNullable()
    table.integer('port', 6).notNullable()
    table.integer('tick', 4).nullable()
    table.string('countrycode', 5).nullable()
    table.string('continentcode', 5).nullable()
    table.integer('errorcount').defaultTo(0)
    table.boolean('disabled').defaultTo(false)
  })
}

export async function down(knex: Knex): Promise<void> {
  return
}
