const mongoose = require('mongoose')
// const reviewSchema = mongoose.Schema({
//     body:{
//         type: String,
//         required: true
//     },
//     date:{
//         type: Date,
//         default: Date.now
//     }
// })
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