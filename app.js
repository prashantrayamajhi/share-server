const express = require("express");
const cors = require("cors");
const app = express();

// routes
const AuthRoute = require("./routes/auth");

// user routes
const UserPostRoute = require("./routes/users/post.route");
const UserProfileRoute = require("./routes/users/profile.route");

// investor routes

// middlewares
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// router middlewares
app.use("/api/v1/auth", AuthRoute);

// user routes
app.use("/api/v1/post", UserPostRoute);
app.use("/api/v1/user/profile", UserProfileRoute);

module.exports = app;
