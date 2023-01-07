const multer = require('multer')

// const upload = multer({
//     storage: Storage
// }).single('file')

const Storage = multer.diskStorage({
    destination: 'uploads/userProfilePic',
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })
  
const upload = multer({ storage: Storage }).single('file')


module.exports = {
    upload
}