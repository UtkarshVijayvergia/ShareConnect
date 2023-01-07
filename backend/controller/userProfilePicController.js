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
// const setProfilePic = asyncHandler(async (req, res) => {
//     const userProfilePic = await UserProfilePic.find({user: req.params.id})
//     // console.log(userProfilePic);
//     if(!userProfilePic[0]){
//         res.status(400)
//         throw new Error('User does not exist')
//     }
//     // check if user logged in
//     if(!req.user){
//         res.status(401)
//         throw new Error('Unauthorized')
//     }
//     // check if logged in user is accesing his user trys only
//     if(userProfilePic[0].user.toString() != req.user.id){
//         res.status(401)
//         throw new Error('User not authorized')
//     }
//     upload, (req, res) => {
//         console.log(req.file);
//         console.log(req.body);
//         console.log("YES");
//         const updatedProfilePic = UserProfilePic.findOneAndUpdate({user: req.params.id}, {
//             name: req.file.filename,
//             image: {
//                 data: req.file.filename,
//                 contentType: "image/png",
//             }
//         })
//         .then(()=>res.status(200).json(updatedProfilePic))
//         .catch((err)=>console.log(err));
        
//     };
// })


const setProfilePic = asyncHandler(async (req, res) => {
    try {
        // Make sure the file was included in the request
        if (!req.file) {
            console.log("No file was provided");
            res.status(400).send({ message: 'No file was provided' })
            return
        }

        // Make sure the user is logged in
        if (!req.user) {
            console.log('Unauthorized');
            res.status(401).send({ message: 'Unauthorized' })
            return
        }

        // Find the user's profile picture document
        const userProfilePic = await UserProfilePic.find({ user: req.params.id })

        // Make sure the user exists
        if (!userProfilePic[0]) {
            console.log("User does not exist");
            res.status(400).send({ message: 'User does not exist' })
            return
        }

        // Make sure the logged in user is trying to access their own profile picture
        if (userProfilePic[0].user.toString() != req.user.id) {
            console.log('User not authorized');
            res.status(401).send({ message: 'User not authorized' })
            return
        }

        // Update the user's profile picture
        console.log(req.file);
        console.log("wertyscf");
        const updatedProfilePic = await UserProfilePic.findOneAndUpdate(
            { user: req.params.id },
            {
                name: req.file.filename,
                image: {
                    data: req.file.filename,
                    contentType: 'image/png',
                },
            }
        )

        res.status(200).json(updatedProfilePic)
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: 'Error updating profile picture' })
    }
})







// @desc    GET ProfilePic
// @route   GET /api/user/profilepic/:id
// @access  Private
const getProfilePic = asyncHandler(async (req, res) => {
    const userProfilePic = await UserProfilePic.find({ user: req.params.id });
    if (!userProfilePic[0]) {
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