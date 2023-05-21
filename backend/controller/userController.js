const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const UserDetails = require('../models/userDetailsModel')
const UserProfilePic = require('../models/userProfilePicModel')




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
    if(user){
        // initialize a null record in userDetails collection
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

        // initialize a default record in userProfilePic collection
        const userProfilePic = await UserProfilePic.create({
            user: user._id,
            image: {
              data: Buffer.from([
                68,
                101,
                97,
                116,
                104,
                32,
                110,
                111,
                116,
                101,
                32,
                45,
                32,
                76,
                46,
                106,
                112,
                103
              ]),
              contentType: "image/png"
            },
            name: "Death note - L.jpg",
        });

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