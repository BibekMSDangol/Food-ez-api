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
    Description:{
        type: String,
        required: true
    },
    restaurant:{
        name:{
            
            required: true
        },
        ref: 'Restaurant'
    }
    
},{timestamps: true})

const reviewSchema = new mongoose.Schema({
    body:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Food', foodSchema)