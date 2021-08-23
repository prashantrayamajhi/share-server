const mongoose = require("mongoose");

module.exports = mongoose.connect(process.env.DATABASE_URI, {
  useCreateIndex: false,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
