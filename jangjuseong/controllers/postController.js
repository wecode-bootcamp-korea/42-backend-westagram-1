const postService = require('../services/postService');

const createPost = async (req, res) => {
  try {
    const { title, content, postImgUrl } = req.body;
    const userId = req.user;

    if (!title || !postImgUrl) {
      const err = new Error('⚠️ Key Error!');
      err.code = 400;
      throw err;
    }

    await postService.createPost(title, content, postImgUrl, userId);

    return res.status(201).json({ message: 'postCreated' });
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  const result = await postService.getPosts();

  return res.status(200).json({ data: result });
};

const getPostByUserId = async (req, res) => {
  const { userId } = req.params;

  const result = await postService.getPostByUserId(userId);

  return res.status(200).json({ data: result });
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user;

    const result = await postService.updatePost(content, userId, postId);

    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;

  await postService.deletePost(postId);

  return res.status(200).json({ message: 'postDeleted' });
};

module.exports = {
  createPost,
  getPosts,
  getPostByUserId,
  updatePost,
  deletePost,
};
