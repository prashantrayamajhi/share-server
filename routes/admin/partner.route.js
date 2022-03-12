const router = require("express").Router();
const controller = require("../../controllers/admin/partner.controller");
const { isAdmin } = require("./../../middleware/role");
const passport = require("passport");
const upload = require("./../../middleware/multer");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  upload.single("image"),
  controller.postPartner
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  upload.single("image"),
  controller.updatePartner
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.deletePartner
);

module.exports = router;
