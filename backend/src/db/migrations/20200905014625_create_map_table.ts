import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('kzstats_map', function (table) {
    table.integer('id').primary().unique().notNullable()
    table.string('name', 60).notNullable()
    table.integer('difficulty', 6).notNullable()
    table.string('workshop_url', 70).nullable()
    table.integer('kztimer_record_id').nullable()
    table.integer('kzsimple_record_id').nullable()
    table.integer('kzvanilla_record_id').nullable()
    table.string('updated_on', 40).nullable()
    table.boolean('validated').defaultTo(false)
  })
}

export async function down(knex: Knex): Promise<void> {
  return
}
