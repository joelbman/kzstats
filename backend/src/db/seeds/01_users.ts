import * as Knex from 'knex'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const denvload = dotenv.config({ path: '../../.env' })
if (denvload.error) {
  console.log('.env load failed')
  process.exit(1)
}

const users: Array<Record<string, unknown>> = []
bcrypt.hash(process.env.SUPERUSER_PASSWORD, 10, function (err, hash) {
  users.push({
    email: process.env.SUPERUSER_EMAIL,
    password: hash,
    name: process.env.SUPERUSER_NAME,
    userlevel: 99,
    unique_id: crypto.randomBytes(12).toString('base64'),
  })
})

export async function seed(knex: Knex): Promise<void> {
  await knex('jbai_users').del()

  await knex('jbai_users').insert(users)
}
