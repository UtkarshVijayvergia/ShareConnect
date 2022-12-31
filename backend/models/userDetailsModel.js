const mongoose = require('mongoose')

const userDetailsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    bio:{
        type: String,
        default: "",
    },
    age:{
        type: String,
        default: "",
    },
    gender:{
        type: String,
        default: "",
    },
    birth:{
        day:{
            type: String,
            default: "",
        },
        month:{
            type: String,
            default: "",
        },
        year:{
            type: String,
            default: "",
        },
    },
    country:{
        type: String,
        default: "",
    },
    state:{
        type: String,
        default: "",
    },
    city:{
        type: String,
        default: "",
    },
    phone:{
        type: String,
        default: "",
    },
},
{
    timestamps: true
});


module.exports = mongoose.model('UserDetails', userDetailsSchema)