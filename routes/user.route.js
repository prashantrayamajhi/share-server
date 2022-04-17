const router = require("express").Router();
const controller = require("../controllers/user.controller");

router.get("/investors", controller.getInvestors);

router.get("/:id", controller.getUserById);

router.post("/contact", controller.contact);

module.exports = router;
