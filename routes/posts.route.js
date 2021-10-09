const router = require("express").Router();
const controller = require("./../controllers/posts.controller");

router.get("/", controller.getPosts);

router.get("/:id", controller.getPostById);

module.exports = router;
