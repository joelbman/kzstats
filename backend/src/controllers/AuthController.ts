import express, { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import AuthService from 'services/AuthService'
import { PassportSteamProfile } from 'types'
import logger from 'util/logger'

const router = express.Router()

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.sendStatus(403)
  }
  return next()
}

// (req, res, next) => {
//   req.url = req.originalUrl
//   next()
// },

router.get(
  '/return',

  passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/')
  }
)

router.get('/profile', checkAuth, (req, res) => {
  res.json(req.user)
})

router.put('/profile', checkAuth, (req, res) => {
  AuthService.editProfile(req.user as PassportSteamProfile, req.body)
    .then((data) => {
      res.json(data)
    })
    .catch((e: Error) => {
      logger.error(e.message)
      res.sendStatus(400)
    })
})

router.get('/logout', checkAuth, (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/', passport.authenticate('steam'), () => {
  // ...
})

export default router
