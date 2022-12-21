const express = require('express')
const router = express.Router()
const { getUserTry, setUserTry, getoneUserTry, updateUserTry } = require('../controller/userTryController')
const { protect } = require('../middleware/authMiddleware')

// Configure cors
const cors = require('cors');
router.use(cors());


router.route('/').get(getUserTry).post(protect, setUserTry)
router.route('/:id').get(getoneUserTry)
router.route('/:id').post(updateUserTry)


module.exports = router;