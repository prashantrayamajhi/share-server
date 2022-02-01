const router = require("express").Router();
const controller = require("../../controllers/admin/users.controller");
const { isAdmin } = require("./../../middleware/role");
const passport = require("passport");

// get users
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.getUsers
);

// get user by id
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.getUserById
);

// verify user
router.patch(
  "/:id/verify",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.verifyUser
);

// create user
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.createUser
);

// update user
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.updateUser
);

// ban user
router.patch(
  "/:id/ban",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.banUser
);

// delete user
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.deleteUser
);

module.exports = router;
