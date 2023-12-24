const mongoose = require('mongoose')

const userPostSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        default: "",
    },
    body: {
        type: String,
        default: "",
    },
    // tags: {
    // },
    // media: {
    // },
},
{
    timestamps: true
});


module.exports = mongoose.model('user_post', userPostSchema)