const express = require("express");
const cors = require("cors");
const app = express();

// routes
const AuthRoute = require("./routes/auth");

// middlewares
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// router middlewares
app.use("/api/v1/auth", AuthRoute);

module.exports = app;
