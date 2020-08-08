import express, { Request, Response, NextFunction } from 'express'
import passport from 'passport'
const router = express.Router()

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.sendStatus(403)
  }
  return next()
}

router.get(
  '/return',
  (req, res, next) => {
    req.url = req.originalUrl
    next()
  },
  passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/')
  }
)

router.get('/account', checkAuth, (req, res) => {
  res.json(req.user)
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/', passport.authenticate('steam'), () => {
  // ...
})

export default router
