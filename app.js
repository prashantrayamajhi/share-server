const express = require("express");
const cors = require("cors");
const app = express();

// middlewares
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

module.exports = app;
