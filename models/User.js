const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: [true, 'This username is already taken.'],
        minLength: [5, 'Username should be longer than 5 characters.']
    },
    contact:{
        type: String,
        required: true,
        minLength: [10, 'The number should be of 10 digits.']
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['User', 'Admin', 'Restaurant'],
        default: 'User'
    }

},{timestamps: true})
module.exports = mongoose.model('User', userSchema)