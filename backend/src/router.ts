import express from 'express'
import AuthController from './controllers/AuthController'
import CountryController from './controllers/CountryController'
import NewsController from './controllers/NewsController'
import PlayerController from './controllers/PlayerController'
import RecordController from './controllers/RecordController'
import ServerController from './controllers/ServerController'

const router = express.Router()

router.use('/auth', AuthController)
router.use('/country', CountryController)
router.use('/player', PlayerController)
router.use('/server', ServerController)
router.use('/record', RecordController)
router.use('/news', NewsController)

export default router
