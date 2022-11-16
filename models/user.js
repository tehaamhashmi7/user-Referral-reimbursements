const mongoose = require("mongoose");

//Creating Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  referredUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: null
  },
  isPaymentMade: {
    type: Boolean,
    default: false,
  },
  totalEarnings: {
    type: Number,
    default: 0,
  },
});

//Creating Model
const User = mongoose.model("user", userSchema);

module.exports = User;
