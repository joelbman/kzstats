import express from 'express'
import AuthController from './controllers/AuthController'
import CountryController from './controllers/CountryController'
import PlayerController from './controllers/PlayerController'
import ServerController from './controllers/ServerController'

const router = express.Router()

router.use('/auth', AuthController)
router.use('/country', CountryController)
router.use('/player', PlayerController)
router.use('/server', ServerController)

export default router
