const router = require("express").Router();
const controller = require("./../../controllers/users/post.controller");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.getPosts
);

module.exports = router;
