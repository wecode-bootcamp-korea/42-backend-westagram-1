const AppDataSource = require("./index");

const createPost = async (title, content, headerEmail) => {
  try {
    return await AppDataSource.query(
      `INSERT INTO posts(
                    title,
                    content,
                    user
                    ) VALUES (?, ?, (SELECT id FROM users WHERE email = ?));
                `,
      [title, content, headerEmail]
    );
  } catch (err) {
    console.log(err);
    throw error;
  }
};

const updatePost = async (postId, title, content, headerEmail) => {
  try {
    return await AppDataSource.query(
      `UPDATE posts SET
                title = ?,
                content =?
            WHERE id = ? AND user = (SELECT id FROM users WHERE email = ?);
            `,
      [postId, title, content, headerEmail]
    );
  } catch (err) {
    console.log(err);
    throw error;
  }
};

const viewPost = async () => {
  try {
    return await AppDataSource.query(
      `SELECT
              users.id as userId,
              users.profile_image as userProfileImage,
              posts.id as postId,
              posts.title as postTitle,
              posts.content as postContent
            FROM posts
            JOIN users
            ON posts.user=users.id;
            `
    );
  } catch (err) {
    console.log(err);
    throw error;
  }
};

const searchPost = async (headerEmail) => {
  try {
    return await AppDataSource.query(
      `SELECT
              users.id as userId,
              users.profile_image as userProfileImage,
              JSON_ARRAYAGG(
                JSON_OBJECT(
                    'postId', posts.id,
                    'postTitle', posts.title,
                    'postContent', posts.content
                )
              ) as posts
            FROM posts
            JOIN users
            ON posts.user=users.id
            WHERE users.email = ?;
            `,
      [headerEmail]
    );
  } catch (err) {
    console.log(err);
    throw error;
  }
};

const deletePost = async (postId, headerEmail) => {
  try {
    await AppDataSource.query(
      `DELETE FROM likes
            WHERE post = ? AND user = (SELECT id FROM users WHERE email = ?)
            `,
      [postId, headerEmail]
    );

    await AppDataSource.query(
      `DELETE FROM posts
            WHERE id = ? AND user = (SELECT id FROM users WHERE email = ?)
            `,
      [postId, headerEmail]
    );
  } catch (err) {
    console.log(err);
    throw error;
  }
};

const likePost = async (headerEmail, postId) => {
  try {
    await AppDataSource.query(
      ` INSERT INTO likes(
                user,
                post
              ) VALUES (?, ?)
              WHERE user = (SELECT id FROM users WHERE email = ?)
              ON DUPLICATE KEY UPDATE status= NOT status;
            `,
      [headerEmail, postId]
    );
  } catch (err) {
    console.log(err);
    throw error;
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
