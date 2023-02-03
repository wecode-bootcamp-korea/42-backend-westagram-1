const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/posts", postController.createPost);
router.patch("/posts/:postId", postController.updatePost);
router.get("/posts", postController.viewPost);
router.get("/posts/:userId", postController.searchPost);
router.delete("/posts/:postId", postController.deletePost);
router.patch("/posts/:postId", postController.likePost);

module.exports = router;
