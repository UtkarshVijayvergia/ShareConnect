const express = require('express')
const router = express.Router()
const { setImage } = require('../controller/userProfilePicController')
const { protect } = require('../middleware/authMiddleware')

// Configure cors
const cors = require('cors');
router.use(cors());


router.route('/:id').post(protect, setImage)
// router.route('/:id').get(getImage)

module.exports = router;