import express from 'express'
import PlayerService from '../services/PlayerService'
import logger from '../util/logger'

const router = express.Router()

router.get('/:steamid64/steam', (req, res) => {
  PlayerService.getSteamProfile(req.params.steamid64)
    .then((data) => {
      res.json(data)
    })
    .catch((e: Error) => {
      logger.error(e.message)
      res.sendStatus(400)
    })
})

export default router
