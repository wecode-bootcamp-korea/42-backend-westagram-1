const postDao = require("../models/postDao");

const createPost = async (title, content, postImageUrl, userId) => {
  const createPost = await postDao.createPost(
    title,
    content,
    postImageUrl,
    userId
  );
  return createPost;
};

const getPostByUserId = async (userId) => {
  return await postDao.getPostByUserId(userId);
};

const getPosts = async () => {
  return await postDao.getPosts();
};

const updatePost = async (content, userId, postId) => {
  const updatePostResult = await postDao.updatePost(content, userId, postId);
  if (!updatePostResult) {
    throw new Error("THIS POST IS NOT YOURS!! SO, YOU CAN NOT MODIFY IT");
  }
  return updatePostResult;
};

const deletePost = async (userId, postId) => {
  const deletePostResult = await postDao.deletePost(userId, postId);
  if (!deletePostResult) {
    throw new Error("THIS POST IS NOT YOURS!!! SO, YOU CAN NOT DELETE IT");
  }
  return deletePostResult;
};

module.exports = {
  createPost,
  getPostByUserId,
  getPosts,
  updatePost,
  deletePost,
};
