const express = require('express')
const router = express.Router()
const { getUserDetails, updateUserDetails } = require('../controller/userDetailsController')
const { protect } = require('../middleware/authMiddleware')

// Configure cors
const cors = require('cors');
router.use(cors());


router.route('/:id').get(protect, getUserDetails)
router.route('/:id').post(protect, updateUserDetails)


module.exports = router;