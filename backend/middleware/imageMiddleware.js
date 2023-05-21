const multer = require('multer')

const Storage = multer.diskStorage({
    destination: 'uploads/userProfilePic',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({
    storage: Storage
}).single('profilePic')


module.exports = {
    upload
}