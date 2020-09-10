import express from 'express'
import PlayerService from '../services/PlayerService'
import logger from '../util/logger'

const router = express.Router()

router.get('/:steamid64/steam', (req, res) => {
  PlayerService.getProfile(req.params.steamid64)
    .then((data) => res.json(data))
    .catch((e: Error) => {
      logger.error(e.message)
      res.sendStatus(400)
    })
})

router.post('/details/', (req, res) => {
  PlayerService.getDetails(req.body)
    .then((data) =>  res.json(data))
    .catch((e: Error) => {
      logger.error(e.message)
      res.sendStatus(400)
    })
})

router.get('/search/:name', (req, res) => {
  PlayerService.searchByName(req.params.name)
  .then((data) => res.json(data))
  .catch((e) => {
    logger.error(e.message)
    res.sendStatus(400)
  })
})

export default router
