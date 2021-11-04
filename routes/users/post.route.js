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

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.updatePost
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.deletePost
);

module.exports = router;
