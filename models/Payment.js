const mongoose = require('mongoose')
const paymentSchema = new mongoose.Schema({
    amount:{
        type: String,
        required: true
    },
    date:{
        type:date,
        date: Date.now
    }
})

