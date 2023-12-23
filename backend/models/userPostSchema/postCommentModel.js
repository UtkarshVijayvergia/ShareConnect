const mongoose = require('mongoose')

const postCommentSchema = mongoose.Schema({
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
    comment_text: {
        type: String,
        default: "",
    },
},
{
    timestamps: true
});


module.exports = mongoose.model('post_comment', postCommentSchema)