const likeDao = require('../models/likeDao');

const likePost = async (userId, postId) => {
  return await likeDao.postLike(userId, postId);
};

module.exports = {
  likePost,
};
