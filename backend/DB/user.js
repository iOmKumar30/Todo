const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    },
  
  todos : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
