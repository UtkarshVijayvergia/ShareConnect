const mongoose = require('mongoose')

const postLikeSchema = mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_post',
        required: true
    },
    profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
{
    timestamps: true
});


module.exports = mongoose.model('post_like', postLikeSchema)