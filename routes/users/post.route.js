const router = require("express").Router();
const controller = require("./../../controllers/users/post.controller");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.getPosts
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.createPost
);

module.exports = router;
