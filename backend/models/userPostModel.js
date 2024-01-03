const mongoose = require('mongoose')

const userPostSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        default: "",
    },
    body: {
        type: String,
        default: "",
    },
    media: [{
        image: {
            data: Buffer,
            contentType: String,
        },
        video: {
            data: Buffer,
            contentType: String,
        },
    }],
    // tags: {
    // },
    likes: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
            required: true,
        },
    }],
    comments: [{
        _id: mongoose.Schema.Types.ObjectId,
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        comment_text: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
            required: true,
        },
    }],
},
{
    timestamps: true,
});


module.exports = mongoose.model('user_post', userPostSchema)