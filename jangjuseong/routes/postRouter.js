const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const { validateToken } = require('../middlewares/auth');

router.post('/', validateToken, postController.createPost);
router.get('/', postController.getPosts);
router.get('/:userId', postController.getPostByUserId);
router.patch('/:postId', validateToken, postController.updatePost);
router.delete('/:postId', validateToken, postController.deletePost);

module.exports = {
  router,
};
