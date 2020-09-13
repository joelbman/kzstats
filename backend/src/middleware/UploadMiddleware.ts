import path from 'path'
import multer from 'multer'

const destination = '../www/img/map/'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destination)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'image/jpeg' || path.extname(file.originalname) !== '.jpg') cb(new Error('Wrong filetype'))
  cb(null, true)
}

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1024 * 1024 } })

export default upload
