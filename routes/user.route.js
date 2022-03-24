const router = require("express").Router();
const controller = require("../controllers/user.controller");

router.get("/investors", controller.getInvestors);

router.get("/:id", controller.getUserById);

module.exports = router;
