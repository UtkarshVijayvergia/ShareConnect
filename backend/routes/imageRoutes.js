const express = require('express')
const router = express.Router()
const { setImage, getImage } = require('../controller/imageController')
const { protect } = require('../middleware/authMiddleware')

// Configure cors
const cors = require('cors');
router.use(cors());


// router.route('/').get(protect, getUserTry).post(protect, setUserTry)
// router.route('/:id').get(protect, getoneUserTry)
// router.route('/:id').post(protect, updateUserTry)

router.route('').post(setImage)
router.route('/:id').get(getImage)

module.exports = router;