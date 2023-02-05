require("dotenv").config();
const jwt = require("jsonwebtoken");
const postDao = require("../models/postDao");

const secretKey = process.env.SECRET_KEY;

const createPost = async (title, content, token) => {
  try {
    const header = jwt.decode(token);
    // if (!header.email) return
    const headerEmail = header.email;
    const verifyToken = jwt.verify(
      token,
      secretKey,
      async (err, headerEmail) => {
        if (err) {
          console.log(err);
          throw err;
        }

        await postDao.createPost(title, content, headerEmail);
      }
    );

    return verifyToken();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updatePost = async (postId, title, content, token) => {
  try {
    const verifyToken = jwt.verify(
      token,
      secretKey,
      async (err, headerEmail) => {
        if (err) {
          console.log(err);
          throw err;
        }
        return await postDao.updatePost(postId, title, content, headerEmail);
      }
    );
    return verifyToken();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const viewPost = async () => {
  try {
    const allPosts = await postDao.viewPost();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const searchPost = async (token) => {
  try {
    const userPosts = "";
    const verifyToken = jwt.verify(
      token,
      secretKey,
      async (err, headerEmail) => {
        if (err) {
          console.log(err);
          throw err;
        }

        return (userPosts = await postDao.updatePost(headerEmail));
      }
    );
    return verifyToken();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deletePost = async (postId, token) => {
  try {
    const verifyToken = jwt.verify(
      token,
      secretKey,
      async (err, headerEmail) => {
        if (err) {
          console.log(err);
          throw err;
        }
        await postDao.deletePost(postId, headerEmail);
      }
    );

    return verifyToken();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const likePost = async (token, postId) => {
  try {
    const verifyToken = jwt.verify(
      token,
      secretKey,
      async (err, headerEmail) => {
        if (err) {
          console.log(err);
          throw err;
        }
        await postDao.likePost(headerEmail, postId);
      }
    );
    return verifyToken();
  } catch (err) {
    console.log(err);
    throw err;
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
