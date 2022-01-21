const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
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

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
