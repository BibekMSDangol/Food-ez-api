const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    quantity:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now(),
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }
})

module.exports = mongoose.model('Order',orderSchema)