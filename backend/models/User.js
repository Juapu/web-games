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
    type: int,
    required: true,
  },
  losses: {
    type: int,
    required: true,
  },
    
  });
  

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);