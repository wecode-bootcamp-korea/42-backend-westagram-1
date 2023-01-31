const postDao = require('../models/postDao');

const postUp = async (title, content, postImgUrl, userId) => {
  return await postDao.createPost(title, content, postImgUrl, userId);
};

const postGet = async () => {
  return await postDao.getPost();
};

const postGetbyUser = async (userId) => {
  return await postDao.getPostbyUser(userId);
};

const postUpdate = async (userId, postId, content) => {
  return await postDao.updatePost(userId, postId, content);
};

const postDelete = async (postId) => {
  return await postDao.deletePost(postId);
};

module.exports = {
  postUp,
  postGet,
  postGetbyUser,
  postUpdate,
  postDelete,
};
