import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('kzstats_world_records', function (
    table
  ) {
    table.integer('id').primary().unique().notNullable()
    table.integer('map_id').notNullable()
    table.integer('server_id').notNullable()
    table.integer('tickrate', 4).notNullable()
    table.integer('teleports', 7).notNullable()
    table.integer('duration').nullable()
    table.float('time').notNullable()
    table.float('timediff').nullable()
    table.string('steamid64', 50).notNullable
    table.string('mode', 20).notNullable()
    table.string('map_name', 60).notNullable()
    table.string('server_name', 40).nullable()
    table.string('player_name', 40).nullable()
    table.string('updated_on', 40).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return
}
