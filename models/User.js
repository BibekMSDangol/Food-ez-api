const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: false,
    },
    lname: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
      unique: [true, "This username is already taken."],
      minLength: [5, "Username should be longer than 5 characters."],
    },
    contact: {
      type: String,
      required: false,
      minLength: [10, "The number should be of 10 digits."],
    },
    email: {
      type: String,
      required: false,
      unique: [true, "This email is already in use."],
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["User", "Admin", "Restaurant"],
      default: "User",
    },
    food: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
