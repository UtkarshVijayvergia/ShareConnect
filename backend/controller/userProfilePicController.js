const asyncHandler = require('express-async-handler')
const UserProfilePic = require('../models/userProfilePicModel')
const multer = require('multer')
const path = require('path')
const fs = require('fs');


// Image Config
const Storage = multer.diskStorage({
    destination: 'uploads/userProfilePic',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({
    storage: Storage
}).single('file')




// @desc    SET ProfilePic
// @route   POST /api/user/profilepic/:id
// @access  Private
const setProfilePic = asyncHandler(async (req, res) => {
    const userProfilePic = await UserProfilePic.find({user: req.params.id})
    // console.log(userProfilePic);
    if(!userProfilePic[0]){
        res.status(400)
        throw new Error('User does not exist')
    }
    // check if user logged in
    if(!req.user){
        res.status(401)
        throw new Error('Unauthorized')
    }
    // check if logged in user is accesing his user trys only
    if(userProfilePic[0].user.toString() != req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    upload(req, res, (err) => {
        if(err){
            console.log(err);
            // res.status(500)
            // throw new Error('Internal Server Error')
        }
        else{
            console.log(req.file);
            console.log(req.body);
            console.log("YES");
            const updatedProfilePic = UserProfilePic.findOneAndUpdate({user: req.params.id}, {
                name: req.file.filename,
                image: {
                    data: req.file.filename,
                    contentType: "image/png",
                }
            })
            .then(()=>res.status(200).json(updatedProfilePic))
            .catch((err)=>console.log(err));
        }
        
    })
})



// @desc    GET ProfilePic
// @route   GET /api/user/profilepic/:id
// @access  Private
const getProfilePic =  asyncHandler(async (req, res) => {
    const userProfilePic = await UserProfilePic.find({ user: req.params.id });
    if(!userProfilePic[0]){
        res.status(400)
        throw new Error('Image does not exist')
    }
    const root = path.resolve('./uploads');
    const filePath = path.join(root, `userProfilePic/${userProfilePic[0].name}`);
    // Check if the file is in the correct folder
    fs.access(filePath, fs.constants.F_OK, (error) => {
        if (error) {
            res.status(404).send('File not found');
        } else {
            res.sendFile(`userProfilePic/${userProfilePic[0].name}`, { root: root });
        }
    });
});




module.exports = {
    setProfilePic,
    getProfilePic,
}