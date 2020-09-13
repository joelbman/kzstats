import express from 'express'
import { checkAuth } from 'middleware/AuthMiddleware'
import passport from 'passport'
import AuthService from 'services/AuthService'
import { PassportSteamProfile } from 'types'
import { BASEURL, production } from 'util/Config'
import logger from 'util/Logger'

const router = express.Router()

router.get(
  '/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(BASEURL)
  }
)

router.get('/profile', checkAuth, (req, res) => {
  res.json(req.user)
})

router.patch('/profile', checkAuth, (req, res) => {
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
  res.json({ status: 'ok' })
})

router.get('/', passport.authenticate('steam'), () => {
  // ...
})

export default router
