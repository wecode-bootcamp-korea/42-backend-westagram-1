// controller - 데이터 검증 및 오류 코드 반환
const postService = require("../services/postService");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { token } = req.headers.authorization;

    if (!title || !token) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.createPost(title, content, token);
    return res.status(201).json({ message: "POST_CREATED" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500), json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    const { token } = req.headers.authorization;

    if (!postId || !token) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.updatePost(postId, title, content, token);
    return res.status(200).json({ message: "POST_UPDATED" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500), json({ message: err.message });
  }
};

// view all posts
const viewPost = async (req, res) => {
  try {
    await postService.viewPost();
    return res.status(200).send({ data: postService.postData });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500), json({ message: err.message });
  }
};

// view user's post
const searchPost = async (req, res) => {
  try {
    const { token } = req.headers.authorization;
    await postService.searchPost(token);
    return res.status(200).send({ data: postService.userPosts });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500), json({ message: err.message });
  }
};

// delete user's post
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { token } = req.body;
    await postService.deletePost(postId, token);
    return res.status(200).json({ message: "POST_DELETED" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500), json({ message: err.message });
  }
};

// like user post
const likePost = async (res, req) => {
  try {
    const { postId } = req.param;
    const { token } = req.headers.authorization;
    await postService.updateStatus(token, postId);
    return res.status(200).json({ message: "LIKE_STATUS_UPDATED" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500), json({ message: err.message });
  }
};

module.exports = {
  createPost,
  updatePost,
  viewPost,
  searchPost,
  deletePost,
  likePost,
};
