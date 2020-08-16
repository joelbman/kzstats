import express from 'express'
import CountryService from '../services/CountryService'
import logger from '../util/logger'

const router = express.Router()

router.get('/', (req, res) => {
  CountryService.getCountries()
    .then((data) => {
      res.send(data)
    })
    .catch((e: Error) => {
      logger.error(e.message)
      res.sendStatus(400)
    })
})

export default router
