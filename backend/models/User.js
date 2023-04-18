const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wins: {
    type: Number,
    required: true,
  },
  losses: {
    type: Number,
    required: true,
  },
  games: {
    type: [String],
    default: [],
  },
  });
  

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);