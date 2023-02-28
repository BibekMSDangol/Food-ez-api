const mongoose = require("mongoose")

CartSchema = new mongoose.Schema({
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Food',
    },
    amount:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","paid","not paid"]
    }
}, {timestamps:true})

module.exports  = mongoose.model("Cart", CartSchema)