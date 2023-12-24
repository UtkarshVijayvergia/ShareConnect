const asyncHandler = require('express-async-handler')
const userPostModel = require('../models/userPostSchema/userPostModel');
const userModel = require('../models/userModel');



// @desc     GET all user post
// @route    GET /api/user/posts
// @access   Private
const getAllPost = asyncHandler(async (req,res) => {
    const allPost = await userPostModel.find({ user_id: req.user._id })
    res.status(200).json(allPost)
})



// @desc     GET one user post
// @route    GET /api/user/posts/:id
// @access   Private
const getOnePost = asyncHandler(async (req,res) => {
    const Onepost = await userPostModel.find({ _id: req.params.id }, 'title body createdAt updatedAt').exec();
    if(!Onepost){
        res.status(400)
        throw new Error('Not authorized')
    }
    res.status(200).json(Onepost)
})



// @desc     POST user post
// @route    POST /api/user/posts
// @access   Private
const setPost = asyncHandler(async (req,res) => {
    const {title, body} = req.body;
    // Field Validations
    if(!title && !body){
        res.status(400)
        throw new Error('Post can not be empty')
    }
    // check if user exists
    if(!req.user){
        res.status(401)
        throw new Error('Unauthorized')
    }
    // Create a new POST
    const post = await userPostModel.create({
        user_id: req.user._id,
        title: title,
        body: body,
    })
    res.status(200).json(post)
})



// @desc     DELETE user post
// @route    DELETE /api/user/posts/:id
// @access   Private
const deletePost = asyncHandler(async (req,res) => {
    const post = await userPostModel.findById(req.params.id);
    // check if goalID exists 
    if(!post){
        res.status(400)
        throw new Error('Post not found')
    }
    // check if user exists
    if(!req.user){
        res.status(401)
        throw new Error('Unauthorized')
    }
    // check if user logged in
    if(post.user_id.toString() !== user._id){
        res.status(401)
        throw new Error('User not authorized')
    }
    await post.remove()
    res.status(200).json({ id: req.params.id });
})



module.exports = {
    getAllPost,
    getOnePost,
    setPost,
    deletePost,
}