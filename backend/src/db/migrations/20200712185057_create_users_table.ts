import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('jbai_users', function (table) {
    table.increments('id')
    table.string('unique_id').unique()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.integer('userlevel').notNullable()
    table.string('name')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('jbai_users')
}
