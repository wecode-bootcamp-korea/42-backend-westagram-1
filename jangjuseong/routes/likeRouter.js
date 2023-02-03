const express = require('express');
const router = express.Router();

const likeController = require('../controllers/likeController');
const { validateToken } = require('../middlewares/auth');

router.post('/:postId', validateToken, likeController.createLike);

module.exports = {
  router,
};
