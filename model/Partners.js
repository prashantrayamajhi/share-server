const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  website: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
    required: true,
  },
  publicKey: {
    type: String,
    trim: true,
    required: true,
  },
});

const Partner = mongoose.model("Partner", PartnerSchema);

module.exports = Partner;
