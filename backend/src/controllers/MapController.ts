import fs from 'fs'
import path from 'path'
import express from 'express'
import imageThumbnail from 'image-thumbnail'
import { checkAdmin } from 'middleware/AuthMiddleware'
import upload from 'middleware/UploadMiddleware'
import logger from 'util/Logger'

// import MapService from 'services/MapService'
const router = express.Router()

router.post('/:mapname/image', checkAdmin, upload.single('map_image'), (req, res, next) => {
  const file = req.file
  if (!file) {
    logger.error('No file')
    res.sendStatus(400)
  }
  res.send(file)
})

// [Node] {
//   [Node]   fieldname: 'map_images',
//   [Node]   originalname: 'WoWScrnShot_100819_190949.jpg',
//   [Node]   encoding: '7bit',
//   [Node]   mimetype: 'image/jpeg',
//   [Node]   destination: '../www/img/map/',
//   [Node]   filename: 'WoWScrnShot_100819_190949.jpg',
//   [Node]   path: '..\\www\\img\\map\\WoWScrnShot_100819_190949.jpg',
//   [Node]   size: 469545
//   [Node] }

//Uploading multiple files
router.post('/image', checkAdmin, upload.array('map_images', 16), (req, res, next) => {
  if (!req.files) {
    logger.error('Img upload failed')
    res.sendStatus(400)
  }

  for (let i = 0; i < req.files.length; i++) {
    if (!req.files[i].path) continue

    const options = { responseType: 'buffer', percentage: 25 }
    imageThumbnail(req.files[i].path, options as any).then((buffer) => {
      fs.writeFileSync(path.dirname(req.files[i].path).concat('/thumb/tn_'+req.files[i].filename), buffer)
    }).catch((e) => res.sendStatus(400))    
  }

  res.sendStatus(200) 
})


export default router
