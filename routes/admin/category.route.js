const router = require("express").Router();
const controller = require("../../controllers/admin/categroy.controller");
const { isAdmin } = require("./../../middleware/role");
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.postCategory
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.updateCategory
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.deleteCategory
);

module.exports = router;
