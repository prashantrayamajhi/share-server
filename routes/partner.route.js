const router = require("express").Router();
const controller = require("../controllers/partners.controller");

router.get("/", controller.getPartners);

router.get("/:id", controller.getPartnerById);

module.exports = router;
