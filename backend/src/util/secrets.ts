import logger from './logger'
import dotenv from 'dotenv'
import path from 'path'

const denvload = dotenv.config({ path: path.join(process.cwd(), '.env') })
if (denvload.error) {
  logger.error('.env loading failed')
  process.exit(1)
}

export const production = process.env.NODE_ENV === 'production'
export const STEAM_API_KEY = process.env['STEAM_API_KEY']
export const SESSION_SECRET = process.env['SESSION_SECRET']

if (!SESSION_SECRET) {
  logger.error('No client secret')
  process.exit(1)
}
