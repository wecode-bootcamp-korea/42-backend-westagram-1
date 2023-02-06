const likeDao = require("../models/likeDao");

const createLikePostByUserId = async (userId, postId) => {
  return await likeDao.createLikePostByUserId(userId, postId);
};

module.exports = {
  createLikePostByUserId,
};
