const asyncHandler = require('express-async-handler')
const Image = require('../models/imageModel')
const multer = require('multer')
const path = require('path')
const fs = require('fs');


// Image Configuration
const Storage = multer.diskStorage({
    destination: 'uploads/testImage',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({
    storage: Storage
}).single('image')




// @desc    SET Image
// @route   POST /api/image/
// @access  Public
const setImage = asyncHandler(async (req, res) => {
    upload(req, res, (err) => {
        if(err){
            console.log(err);
        }
        else{
            const newImage = new Image({
                name: req.file.filename,
                image: {
                    data: req.file.filename,
                    contentType: "image/png",
                }
            })
            newImage.save()
            .then(()=>res.send("done"))
            .catch((err)=>console.log(err));
        }
    })
})



// @desc    GET Image
// @route   GET /api/image/:id
// @access  Public
const getImage =  asyncHandler(async (req, res) => {
    const image = await Image.find({ name: req.params.id });
    console.log(image);
    if(!image.name){
        res.status(400)
        throw new Error('Image does not exist')
    }
    const root = path.resolve('./uploads');
    const filePath = path.join(root, `testImage/${req.params.id}`);
    // Check if the file is in the correct folder
    fs.access(filePath, fs.constants.F_OK, (error) => {
        if (error) {
            res.status(404).send('File not found');
        } else {
            res.sendFile(`testImage/${req.params.id}`, { root: root });
        }
    });
});



module.exports = {
    setImage,
    getImage
}