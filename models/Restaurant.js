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
    location:{
        type: String,
        required: true
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Food"
    }
    // menu:{
    //     type: mongoose.Schema.Types.ObjectId,name:{
    //         type: String,
    //         required: true
    //     }

    // }
})
module.exports = mongoose.model('Restaurant', restaurantSchema)