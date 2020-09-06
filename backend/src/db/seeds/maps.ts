import * as Knex from 'knex'
import { globalAPI } from 'util/API'

export async function seed(knex: Knex): Promise<void> {
  await knex('kzstats_map').del()
}
