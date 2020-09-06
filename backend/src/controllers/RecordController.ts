import express from 'express'
import RecordService from '../services/RecordService'
import logger from '../util/logger'

const router = express.Router()

router.put('/:mapname', (req, res) => {
  RecordService.updateMapRecords(
    req.params.mapname,
    req.body.params.mode,
    req.body.params.tickrate
  )
    .then(() => {
      res.json({ status: 'ok' })
    })
    .catch((e) => {
      logger.error(e.message)
      res.status(400)
      res.json({ error: e.message })
    })
})

export default router
