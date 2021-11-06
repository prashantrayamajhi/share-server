const router = require("express").Router();
const passport = require("passport");
const controller = require("./../controllers/posts.controller");
const { isInvestor } = require("./../middleware/role");

router.get("/", controller.getPosts);

router.get("/:id", controller.getPostById);

router.get(
  "/allPosts",
  passport.authenticate("jwt", {
    session: false,
  }),
  isInvestor,
  controller.getAllPosts
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
