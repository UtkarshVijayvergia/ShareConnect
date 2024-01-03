const asyncHandler = require('express-async-handler')
const userPostModel = require('../models/userPostModel');



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
    // check if user exists
    if(!req.user){
        res.status(401)
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const {title, body} = req.body;
    // Field Validations
    if(!title && !body){
        res.status(400)
        return res.status(400).json({ message: 'Post can not be empty' });
    }
    // Create a new POST
    const post = await userPostModel.create({
        user_id: req.user._id,
        title: title,
        body: body,
        media: [],
        likes: [],
        comments: [],
    })
    res.status(200).json(post)
})



// @desc     DELETE user post
// @route    DELETE /api/user/posts/:userID/:postID
// @access   Private
const deletePost = asyncHandler(async (req,res) => {
    // check if correct user have access
    if(req.user._id.toString()!=req.params.userID){
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // check if postID exists
    try{
        const post = await userPostModel.findById( req.params.postID );
        if(!post){
            return res.status(404).json({ message: 'Resource not found' });
        }
        await post.remove();
        res.status(200).json({ message: 'Post deleted successfully' });
    }
    catch(error){
        // Handle the specific CastError thrown by findById
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Resource not found' });
        } 
        // Handle other errors
        else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
})



// @desc     POST like a post
// @route    POST /api/user/posts/:postID/like
// @access   Private
const likePost = asyncHandler(async (req, res) => {
    const post = await userPostModel.findById(req.params.postID);
    // Check if post exists
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    // Check if user already liked the post
    const alreadyLiked = post.likes.find(like => like.user_id.toString() === req.user._id.toString());
    if (alreadyLiked) {
        // Remove the like
        post.likes = post.likes.filter(like => like.user_id.toString() !== req.user._id.toString());
        await post.save();
        return res.status(200).json(post);
    }
    // Like the post
    post.likes.push({ user_id: req.user._id });
    await post.save();
    res.status(200).json(post);
});


// @desc     POST a comment
// @route    POST /api/user/posts/:postID/comment
// @access   Private
const commentPost = asyncHandler(async (req, res) => {
    const post = await userPostModel.findById(req.params.postID);
    // Check if post exists
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    // Check if comment is empty
    const comment_text = req.body.comment_text;
    if(!comment_text){
        return res.status(400).json({ message: 'Comment can not be empty' });
    }
    // Add the Comment in the post
    const comment = {
        // _id: new mongoose.Types.ObjectId(),
        user_id: req.user._id,
        comment_text: comment_text
    };
    post.comments.unshift(comment);
    await post.save();
    res.status(200).json(post);
});



module.exports = {
    getAllPost,
    getAllUserPost,
    getOneUserPost,
    setPost,
    deletePost,
    likePost,
    commentPost,
}