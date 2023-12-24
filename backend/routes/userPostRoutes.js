const express = require('express')
const router = express.Router()
const { getAllPost, getOnePost, setPost, deletePost } = require('../controller/userPostController')
const { protect } = require('../middleware/authMiddleware')

// Configure cors
const cors = require('cors');
router.use(cors());


router.route('/').get(protect, getAllPost).post(protect, setPost)
router.route('/:id').get(protect, getOnePost)
router.route('/:id').delete(protect, deletePost)


module.exports = router;