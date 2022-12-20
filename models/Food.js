const mongoose = require('mongoose')
const foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
        Description:{
            type: String,
            required: true
        },
    restaurant:{
        type: mongoose.Schema.Types.ObjectId, name:{
            type: String,
            required: true
        },
        ref: 'Restaurant'
    }
    
},{timestamps: true})
module.exports = mongoose.model('Food', foodSchema)