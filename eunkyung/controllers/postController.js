const postService = require("../services/postService");

const createPost = async (req, res) => {
  const { title, content, postImageUrl } = req.body;
  const userId = req.user;
  await postService.createPost(title, content, postImageUrl, userId);
  return res.status(201).json({ message: "POSTING_SUCCESS" });
};

const getPostByUserId = async (req, res) => {
  const { userId } = req.params;
  const [userPostResult] = await postService.getPostByUserId(userId);
  return res.status(200).json({ data: userPostResult });
};

const getPosts = async (req, res) => {
  const postListResult = await postService.getPosts();
  return res.status(200).json({ data: postListResult });
};

const updatePost = async (req, res) => {
  const { content, postId } = req.body;
  const userId = req.user;
  try {
    const updatePostResult = await postService.updatePost(
      content,
      userId,
      postId
    );
    return res.status(200).json({ data: updatePostResult });
  } catch (err) {
    return res.status(401).json(err.message);
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const userId = req.user;
    await postService.deletePost(userId, postId);
    return res.status(200).json({ message: `${postId} post deleted` });
  } catch (err) {
    return res.status(401).json(err.message);
  }
};

module.exports = {
  createPost,
  getPostByUserId,
  getPosts,
  updatePost,
  deletePost,
};
