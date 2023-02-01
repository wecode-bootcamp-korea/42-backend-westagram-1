const likeService = require('../services/likeService');

const createLike = async (req, res) => {
  const { userId, postId } = req.params;

  await likeService.createLike(userId, postId);

  return res.status(201).json({ message: 'likeCreated' });
};

module.exports = { createLike };
