const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:userId', postController.getPostByUserId);
router.patch('/:postId/:userId', postController.updatePost);
router.delete('/:postId', postController.deletePost);

module.exports = {
  router,
};
