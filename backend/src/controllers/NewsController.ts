import express from 'express'
import { newsList } from '../tasks/DiscordBotTask'

const router = express.Router()

router.get('/', (req, res) => {
  res.json(newsList)
})

export default router
