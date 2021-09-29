const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
    requried: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // expires in 10 minutes
    expires: 600,
  },
});

const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;
