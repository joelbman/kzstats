import express from 'express'
import { checkAdmin } from 'middleware/AuthMiddleware'
import upload from 'middleware/UploadMiddleware'
import MapService from 'services/MapService'
import { PassportSteamProfile } from 'types'
import logger from 'util/Logger'

const router = express.Router()

router.get('/image/log', checkAdmin, (req, res) => {
  MapService.getUploadLog()
    .then((data) => {
      res.json(data)
    })
    .catch((e) => {
      logger.error(e.message)
      res.sendStatus(400)
    })
})

// Uploading multiple files
router.post('/image', checkAdmin, upload.array('map_images', 16), (req, res) => {
  if (!req.files) {
    logger.error('No images')
    res.sendStatus(400)
  }

  MapService.uploadImages(req.files, req.user as PassportSteamProfile)
    .then(() => res.sendStatus(200))
    .catch((e) => {
      logger.error(e.message)
      res.sendStatus(400)
    })
})

export default router
