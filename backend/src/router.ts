import express from 'express'
import AuthController from './controllers/AuthController'

const router = express.Router()

router.use('/auth', AuthController)

export default router
