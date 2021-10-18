const express = require("express");
const cors = require("cors");
const app = express();
const passport = require("./security/passport");

passport(require("passport"));

// routes
const AuthRoute = require("./routes/auth.route");
const PostRoute = require("./routes/posts.route");

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
app.use("/api/v1/posts", PostRoute);

// user routes
app.use("/api/v1/user/posts", UserPostRoute);
app.use("/api/v1/user/profile", UserProfileRoute);

module.exports = app;
