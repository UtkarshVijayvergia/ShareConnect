const express = require('express')
const router = express.Router()
const {  getProfilePic, setProfilePic } = require('../controller/userProfilePicController')
const { protect } = require('../middleware/authMiddleware')

// Configure cors
const cors = require('cors');
router.use(cors());


router.route('/:id').get(protect, getProfilePic).post(protect, setProfilePic);

module.exports = router;