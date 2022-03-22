const router = require("express").Router();
const controller = require("../controllers/user.controller");

router.get("/investors", controller.getInvestors);

module.exports = router;
