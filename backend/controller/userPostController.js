const asyncHandler = require('express-async-handler')
const userPostModel = require('../models/userPostSchema/userPostModel');



// @desc     GET all user post
// @route    GET /api/user/posts/
// @access   Private
const getAllPost = asyncHandler(async (req,res) => {
    const allPost = await userPostModel.find();
    allPost.reverse();
    res.status(200).json(allPost)
})



// @desc     GET all particular user post
// @route    GET /api/user/posts/:id
// @access   Private
const getAllUserPost = asyncHandler(async (req,res) => {
    if(!req.user){
        res.status(401)
        throw new Error('Unauthorized')
    }
    const allPost = await userPostModel.find({ user_id: req.params.id })
    res.status(200).json(allPost)
})



// @desc     GET one user post
// @route    GET /api/user/posts/:userID/:postID
// @access   Private
const getOneUserPost = asyncHandler(async (req,res) => {
    if(req.user._id!=req.params.userID){
        res.status(401)
        throw new Error('Unauthorized')
    }
    const Onepost = await userPostModel.find({ _id: req.params.postID }, 'title body createdAt updatedAt').exec();
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
// @route    DELETE /api/user/posts/:userID/:postID
// @access   Private
const deletePost = asyncHandler(async (req,res) => {
    // check if user exists
    if(!req.user){
        res.status(401)
        throw new Error('Unauthorized')
    }
    // check if correct user have access
    if(req.user._id!=req.params.userID){
        res.status(401)
        throw new Error('Unauthorized')
    }
    // check if postID exists
    try{
        const post = await userPostModel.findById( req.params.postID );
        if(!post){
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        console.log(post);
        await post.remove();
        res.status(200).json({ id: req.params.id });
    }
    catch(error){
        // Handle the specific CastError thrown by findById
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            res.status(400).json({ message: 'Post not found' });
        } 
        // Handle other errors
        else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
})



module.exports = {
    getAllPost,
    getAllUserPost,
    getOneUserPost,
    setPost,
    deletePost,
}