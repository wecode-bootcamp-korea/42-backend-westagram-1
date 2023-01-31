const likeService = require('../services/likeService');

const postLike = async (req, res) => {
  const { userId, postId } = req.params;

  await likeService.likePost(userId, postId);

  return res.status(201).json({ message: 'likeCreated' });
};

module.exports = { postLike };
