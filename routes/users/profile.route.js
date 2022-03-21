const router = require("express").Router();
const upload = require("./../../middleware/multer");
const passport = require("passport");
// import profile controller
const profileController = require("../../controllers/users/profile.controller");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.getProfile
);

router.patch(
  "/general",
  passport.authenticate("jwt", { session: false }),
  profileController.updateGeneral
);

router.patch(
  "/verification",
  passport.authenticate("jwt", { session: false }),
  profileController.updateVerificationDetails
);

router.patch(
  "/password",
  passport.authenticate("jwt", { session: false }),
  profileController.updatePassword
);

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.updateProfile
);

router.patch(
  "/password",
  passport.authenticate("jwt", { session: false }),
  profileController.updatePassword
);

router.patch(
  "/image",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  profileController.updateProfileImage
);

router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  profileController.deleteProfileAndPosts
);

module.exports = router;
