import express from 'express'
import ServerService from 'services/ServerService'
import { currentList } from 'tasks/ServerListTask'
import logger from 'util/Logger'

const router = express.Router()

router.get('/', (req, res) => {
  res.json(currentList)
})

router.get('/:serverip', (req, res) => {
  ServerService.getServerInfo(req.params.serverip)
    .then((data) => {
      res.json(data)
    })
    .catch((e) => {
      logger.error(e.message)
      res.status(400)
      res.json({ error: e.message })
    })
})

export default router
