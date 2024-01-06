const express = require('express')
const router = express.Router()
const {  getProfilePic, setProfilePic } = require('../controller/userProfilePicController')
const { protect } = require('../middleware/authMiddleware')
const { upload } = require('../middleware/profilePicMiddleware')

// Configure cors
const cors = require('cors');
router.use(cors());


router.route('/:id').get(getProfilePic).post(protect, upload, setProfilePic);

module.exports = router;