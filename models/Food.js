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
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurants'
    },
    image:{
        type:String,
        require:true,
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