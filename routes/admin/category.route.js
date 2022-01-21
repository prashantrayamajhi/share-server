const router = require("express").Router();
const controller = require("../../controllers/admin/categroy.controller");

router.post("/", controller.postCategory);

router.patch("/:id", controller.updateCategory);

router.delete("/:id", controller.deleteCategory);

module.exports = router;
