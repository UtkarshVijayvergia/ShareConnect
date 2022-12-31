const mongoose = require('mongoose')

const userTrySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    textField1:{
        type:String,
        required:[false,'Please add textField1 value']
    },
    textField2:{
        type:String,
        required:[false,'Please add a textField2 value']
    },
    textField3:{
        type:String,
        required:[false,'Please add a textField3 value']
    },
    // image:{
    //     data:Buffer,
    //     contentType: String,
    //     required:[false],
    // },
},
{
    timestamps: true
});


module.exports = mongoose.model('UserTry', userTrySchema)