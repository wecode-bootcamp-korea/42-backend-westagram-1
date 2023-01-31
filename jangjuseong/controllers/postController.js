const postService = require('../services/postService');

const createPost = async (req, res) => {
  const { title, content, postImgUrl, userId } = req.body;

  await postService.postUp(title, content, postImgUrl, userId);

  return res.status(200).json({ message: 'postCreated' });
};

const getPost = async (req, res) => {
  const result = await postService.postGet();

  return res.status(200).json({ data: result });
};

const getPostbyUser = async (req, res) => {
  const { userId } = req.params;

  const result = await postService.postGetbyUser(userId);

  return res.status(200).json({ data: result });
};

const updatePost = async (req, res) => {
  const { userId, postId } = req.params;
  const { content } = req.body;

  const result = await postService.postUpdate(content, userId, postId);

  return res.status(201).json({ data: result });
};

const deletePost = async (req, res) => {
  const { postId } = req.params;

  await postService.postDelete(postId);

  return res.status(204).json({ message: 'postingDeleted' });
};

module.exports = {
  createPost,
  getPost,
  getPostbyUser,
  updatePost,
  deletePost,
};
