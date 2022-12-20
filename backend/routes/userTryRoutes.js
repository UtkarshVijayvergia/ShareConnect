const express = require('express')
const router = express.Router()
const { getUserTry, setUserTry, updateUserTry } = require('../controller/userTryController')
const { protect } = require('../middleware/authMiddleware')

// Configure cors
const cors = require('cors');
router.use(cors());


router.route('/').get(protect, getUserTry).post(protect, setUserTry)
router.route('/:id').put(protect, updateUserTry)


module.exports = router;