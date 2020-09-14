import { db } from 'db/db'
import { NextFunction, Request, Response } from 'express'
import { PassportSteamProfile } from 'types'

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.sendStatus(403)
  }
  return next()
}

const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) return res.sendStatus(403)

  const admins = await db('kzstats_admins').where('steamid64', '=', (req.user as PassportSteamProfile).id)
  if (admins.length !== 1) return res.sendStatus(403)

  return next()
}

export { checkAdmin, checkAuth }
