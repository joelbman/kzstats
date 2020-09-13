import path from 'path'
import multer from 'multer'

const destination = '../www/img/map/'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destination)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  console.log(file)
  if (file.mimetype !== 'image/jpeg' || path.extname(file.originalname) !== '.jpg') cb(new Error('Wrong filetype'))
  cb(null, true)
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

export default upload
