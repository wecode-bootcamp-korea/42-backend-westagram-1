const postDao = require('../models/postDao');

const createPost = async (title, content, postImgUrl, userId) => {
  return await postDao.createPost(title, content, postImgUrl, userId);
};

const getPosts = async () => {
  return await postDao.getPosts();
};

const getPostByUserId = async (userId) => {
  return await postDao.getPostByUserId(userId);
};

const updatePost = async (userId, postId, content) => {
  return await postDao.updatePost(userId, postId, content);
};

const deletePost = async (postId) => {
  return await postDao.deletePost(postId);
};

module.exports = {
  createPost,
  getPosts,
  getPostByUserId,
  updatePost,
  deletePost,
};
