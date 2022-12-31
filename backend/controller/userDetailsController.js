const asyncHandler = require('express-async-handler')
const UserDetails = require('../models/userDetailsModel')



// @desc     GET user details
// @route    GET /api/user/details/:id
// @access   Private
const getUserDetails = asyncHandler(async (req,res) => {
    const userdetails = await UserDetails.find({ user: req.params.id }, 'bio age gender birth country state city phone').exec();
    if(!userdetails){
        res.status(400)
        throw new Error('Not authorized')
    }
    res.status(200).json(userdetails)
})



// @desc    Update user details
// @route   PUT /api/user/details/:id
// @access  Private
const updateUserDetails = asyncHandler(async (req,res) => {
    const userdetails = await UserDetails.find({user: req.params.id})
    if(!userdetails){
        res.status(400)
        throw new Error('User does not exist')
    }
    // check if user logged in
    if(!req.user){
        res.status(401)
        throw new Error('Unauthorized')
    }
    // check if logged in user is accesing his user trys only
    if(userdetails[0].user.toString() != req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedDetails = await UserDetails.findOneAndUpdate({user: req.params.id}, req.body, { new: true })
    res.status(200).json(updatedDetails)
})




module.exports = {
    getUserDetails,
    updateUserDetails,
}