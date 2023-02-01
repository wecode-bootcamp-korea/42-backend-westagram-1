const express = require('express');
const router = express.Router();

const likeController = require('../controllers/likeController');

router.post('/:userId/:postId', likeController.createLike);

module.exports = {
  router,
};
