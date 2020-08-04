import logger from './logger'
import dotenv from 'dotenv'

let denvload = dotenv.config()
if (denvload.error) {
  // workaround for knex cli commands
  denvload = dotenv.config({ path: '../../.env' })

  if (denvload.error) {
    logger.error('.env loading failed')
    process.exit(1)
  }
}

export const production = process.env.NODE_ENV === 'production'
export const STEAM_API_KEY = process.env['STEAM_API_KEY']
export const SESSION_SECRET = process.env['SESSION_SECRET']

if (!SESSION_SECRET) {
  logger.error('No client secret')
  process.exit(1)
}

export const db = {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}
