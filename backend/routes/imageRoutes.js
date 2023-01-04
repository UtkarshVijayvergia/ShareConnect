const express = require('express')
const router = express.Router()
const { setImage, getImage, getAllImage } = require('../controller/imageController')
const { protect } = require('../middleware/authMiddleware')

// Configure cors
const cors = require('cors');
router.use(cors());


// router.route('/').get(protect, getUserTry).post(protect, setUserTry)
// router.route('/:id').get(protect, getoneUserTry)
// router.route('/:id').post(protect, updateUserTry)

router.route('').get(getAllImage).post(setImage)
router.route('/:id').get(getImage)

module.exports = router;