const router = require("express").Router();
const controller = require("../../controllers/admin/categroy.controller");
const { isAdmin } = require("./../../middleware/role");
const passport = require("passport");
const upload = require("./../../middleware/multer");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  upload.single("image"),
  controller.postCategory
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  upload.single("image"),
  controller.updateCategory
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.deleteCategory
);

module.exports = router;
