import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('kzstats_user').del()

  //await knex('kzstats_user').insert([{ steamid64: '76561197987082796' }])
}
