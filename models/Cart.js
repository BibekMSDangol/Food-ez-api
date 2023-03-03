const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  foods: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Food'
  },
});
module.exports = mongoose.model('Cart', cartSchema)