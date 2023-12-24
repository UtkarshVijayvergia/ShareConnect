const express = require('express')
const router = express.Router()
const { getUserTry, setUserTry, getoneUserTry, updateUserTry } = require('../controller/testControllers/userTryController')
const { protect } = require('../middleware/authMiddleware')

// Configure cors
const cors = require('cors');
router.use(cors());


router.route('/').get(protect, getUserTry).post(protect, setUserTry)
router.route('/:id').get(protect, getoneUserTry)
router.route('/:id').post(protect, updateUserTry)


module.exports = router;