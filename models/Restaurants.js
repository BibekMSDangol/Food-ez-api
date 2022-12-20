const mongoose = require('mongoose')
const restaurantSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    menu:{
        type: mongoose.Schema.Types.ObjectId,name:{
            type: String,
            required: true
        }

    }
})
module.exports = mongoose.model('Restaurants', restaurantSchema)