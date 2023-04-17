const mongoose = require("mongoose");

const GamestateSchema = mongoose.Schema({
  gamename: {
    type: String,
    required: true, 
  },
  serializedgame: {
    type: String,
    required: true,
  },
  gameid: {
    type: String,
    required: true,
  },
  });
  

// export model user with UserSchema
module.exports = mongoose.model("gamestate", GamestateSchema);