const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const UserDetails = require('../models/userDetailsModel')




// @desc    Register new user
// @route   POST /api/users
// @access  Public  
const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password } = req.body;
    // check for field validations
    if(!name){
        res.status(400)
        throw new Error('Please Add Your Name')
    }
    if(!email){
        res.status(400)
        throw new Error('Please Add Your Email')
    }
    if(!password){
        res.status(400)
        throw new Error('Please Add A Password')
    }
    // check if user exist
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exist')
    }
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
    // initialize a null record in userDetails collection
    if(user){
        const userDetails = await UserDetails.create({
            user: user._id,
            bio: "",
            age: "",
            gender: "",
            birth: {
                day: "",
                month: "",
                year: "",
            },
            country: "",
            state: "",
            city: "",
            phone: "",
        })
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})




// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public  
const loginUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body
    // check for user email
    const user = await User.findOne({email})
    // compare passwords
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})




// @desc    Get user data
// @route   GET /api/users/me
// @access  Private  
const getMe = asyncHandler(async (req,res) => {
    res.status(200).json(req.user)
})



module.exports = {
    registerUser,
    loginUser,
    getMe,
}






// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}