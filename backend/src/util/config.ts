import path from 'path'
import dotenv from 'dotenv'
import logger from './logger'

let denv = dotenv.config({ path: path.join(process.cwd(), '.env') })
if (denv.error) {
  // workaround for knex commands
  denv = dotenv.config({ path: '../../.env' })
  if (denv.error) {
    logger.error('.env loading failed')
    process.exit(1)
  }
}

export const production = process.env.NODE_ENV === 'production'
export const STEAM_API_KEY = process.env['STEAM_API_KEY']
export const SESSION_SECRET = process.env['SESSION_SECRET']
export const DISCORD_KEY = process.env['DISCORD_KEY']
export const DB_CONFIG = {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
}

if (!SESSION_SECRET) {
  logger.error('No client secret')
  process.exit(1)
}
