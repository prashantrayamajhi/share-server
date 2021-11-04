const router = require("express").Router();

const passport = require("passport");
// import profile controller
const profileController = require("../../controllers/users/profile.controller");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.getProfile
);

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.updatePassword
);

router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  profileController.deleteProfileAndPosts
);

module.exports = router;
