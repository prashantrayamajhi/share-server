const router = require("express").Router();
const passport = require("passport");
const controller = require("./../controllers/posts.controller");
const { isInvestor } = require("./../middleware/role");
const upload = require("./../middleware/multer");

router.get("/", controller.getPosts);

router.get("/:id", controller.getPostById);

router.get("/user/:id", controller.getPostsByUserId);

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
  upload.array("images"),
  controller.createPost
);

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.array("image"),
  controller.updatePost
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.deletePost
);

module.exports = router;
