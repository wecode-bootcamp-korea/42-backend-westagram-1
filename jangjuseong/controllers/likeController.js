const likeService = require('../services/likeService');

const createLike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user;

  await likeService.createLike(userId, postId);

  return res.status(201).json({ message: 'likeCreated' });
};

module.exports = { createLike };
