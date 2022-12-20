const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    
    food: [{
        type: mongoose.Schema.Types.ObjectId,name: {
        type: String,
        required: [true, 'Name is required']
    },  
        ref: 'Food'
    }]
})

module.exports = mongoose.model('Category', categorySchema)