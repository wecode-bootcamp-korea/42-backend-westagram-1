const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/auth");
const postController = require("../controllers/postController");

router.get("/", postController.getPosts);
router.post("/", validateToken, postController.createPost);
router.get("/:userId", postController.getPostByUserId);
router.patch("/", validateToken, postController.updatePost);
router.delete("/:postId", validateToken, postController.deletePost);

module.exports = { router };
