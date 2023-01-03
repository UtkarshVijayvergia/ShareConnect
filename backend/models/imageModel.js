const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    name:{
        type: String,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('Image', imageSchema);