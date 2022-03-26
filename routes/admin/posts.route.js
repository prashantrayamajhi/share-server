const router = require("express").Router();
const controller = require("../../controllers/admin/posts.controller");
const { isAdmin } = require("./../../middleware/role");
const passport = require("passport");

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.deleteUser
);

module.exports = router;
