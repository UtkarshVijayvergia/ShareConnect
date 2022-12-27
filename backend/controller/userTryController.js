const asyncHandler = require("express-async-handler")
const UserTry = require("../models/UserTryModel")


// @desc     GET UserTry
// @route    GET /api/usertry
// @access   Public
const getUserTry = asyncHandler(async (req,res) => {
    // const test = await UserTry.find({ user: req.user.id })
    const test = await UserTry.find();
    res.status(200).json(test)
})



// @desc    SET userTry
// @route   POST /api/usertry
// @access  Private
const setUserTry = asyncHandler(async (req,res) => {
    if(!req.body.textField1){
        res.status(400).json({message: 'Please add a textField1 field'})
        throw new Error('Please add a textField1 field')
    }
    if(!req.body.textField2){
        res.status(400).json({message: 'Please add a textField2 field'})
        throw new Error('Please add a textField2 field')
    }
    if(!req.body.textField3){
        res.status(400).json({message: 'Please add a textField3 field'})
        throw new Error('Please add a textField3 field')
    }

    const test = await UserTry.create({
        textField1: req.body.textField1,
        textField2: req.body.textField2,
        textField3: req.body.textField3,
        user: req.user.id
    })
    res.status(200).json(test)
})




// @desc    GETone userTry
// @route   GET /api/usertry/:id
// @access  Public
const getoneUserTry = asyncHandler(async (req,res) => {
    const test = await UserTry.find({ user: req.params.id }, 'textField1 textField2 textField3' ).exec();
    if(!test){
        res.status(400)
        throw new Error('User Try not found')
    }
    // check if user logged in
    // if(!req.user){
    //     res.status(401)
    //     throw new Error('User not found')
    // }
    // check if logged in user is accesing his user trys only
    // if(test.user.toString() != req.user.id){
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }
    // const updatedTest = await UserTry.findByIdAndUpdate(req.params.id, req.body, { new: true })
    // console.log(test);
    res.status(200).json(test)
})




// @desc    Update userTry
// @route   PUT /api/usertry/:id
// @access  Private
const updateUserTry = asyncHandler(async (req,res) => {
    const test = await UserTry.find({user: req.params.id})
    // if(!test){
        //     res.status(400)
        //     throw new Error('User Try not found')
        // }
        // check if user logged in
        // if(!req.user){
            //     res.status(401)
            //     throw new Error('User not found')
            // }
            // // check if logged in user is accesing his user trys only
            // if(test.user.toString() != req.user.id){
                //     res.status(401)
                //     throw new Error('User not authorized')
                // }
                console.log(req.body);
    const updatedTest = await UserTry.updateOne({user:req.params.id}, req.body, { new: true })
    console.log(updatedTest);
    res.status(200).json(updatedTest)
})



module.exports = {
    getUserTry,
    setUserTry,
    getoneUserTry,
    updateUserTry,
}