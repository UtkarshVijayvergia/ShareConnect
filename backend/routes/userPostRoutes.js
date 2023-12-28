const express = require('express')
const router = express.Router()
const { getAllPost, getAllUserPost, getOneUserPost, setPost, deletePost } = require('../controller/userPostController')
const { protect } = require('../middleware/authMiddleware')

// Configure cors
const cors = require('cors');
router.use(cors());


router.route('').get(protect, getAllPost)
router.route('').post(protect, setPost)
router.route('/:id').get(protect, getAllUserPost)
router.route('/:userID/:postID').get(protect, getOneUserPost)
router.route('/:userID/:postID').delete(protect, deletePost)


module.exports = router;