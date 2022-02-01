const express = require("express");
const cors = require("cors");
const app = express();
const passport = require("./security/passport");

passport(require("passport"));

// routes
const AuthRoute = require("./routes/auth.route");
const PostRoute = require("./routes/posts.route");
const CategoryRoute = require("./routes/category.route");

// user routes
const UserPostRoute = require("./routes/users/post.route");
const UserProfileRoute = require("./routes/users/profile.route");

// admin routes
const AdminCategoryRoute = require("./routes/admin/category.route");
const AdminUserRoute = require("./routes/admin/user.route");

// investor routes

// middlewares
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// router middlewares
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/posts", PostRoute);
app.use("/api/v1/categories", CategoryRoute);

// user routes
app.use("/api/v1/user/posts", UserPostRoute);
app.use("/api/v1/user/profile", UserProfileRoute);

// admin routes
app.use("/api/v1/admin/categories", AdminCategoryRoute);
app.use("/api/v1/admin/users", AdminUserRoute);

module.exports = app;
