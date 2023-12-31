const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUserDetails, getMe } = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')

// Configure cors
const cors = require('cors');
router.use(cors());

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/:id', getUserDetails)


module.exports = router;