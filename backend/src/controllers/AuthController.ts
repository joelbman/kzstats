import express from 'express'
import { checkAdmin, checkAuth } from 'middleware/AuthMiddleware'
import passport from 'passport'
import { BASEURL } from 'util/Config'

const router = express.Router()

router.get('/return', passport.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
  res.redirect(BASEURL)
})

router.get('/profile', checkAuth, (req, res) => {
  res.json(req.user)
})

router.get('/profile/admin', checkAdmin, (req, res) => {
  res.json(req.user)
})

router.get('/logout', checkAuth, (req, res) => {
  req.logout()
  res.json({ status: 'ok' })
})

router.get('/', passport.authenticate('steam'), () => {
  // ...
})

export default router
