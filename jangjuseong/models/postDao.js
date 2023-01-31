const mysqlDataSource = require('./daoModule');

const createPost = async (title, content, postImgUrl, userId) => {
  await mysqlDataSource.query(
    `
    INSERT INTO posts (
      title,
      content,
      post_image_url,
      user_id
    )
    VALUES (
      ?,
      ?,
      ?,
      ?
    );
    `,
    [title, content, postImgUrl, userId]
  );
};

const getPost = async () => {
  return await mysqlDataSource.query(
    `
    SELECT
      u.id AS userId,
      u.profile_image AS userProfileImage,
      p.id AS postingId,
      p.post_image_url AS postingImageUrl,
      p.content AS postingContent
    FROM posts p
    INNER JOIN users u ON u.id = p.user_id;
    `
  );
};

const getPostbyUser = async (userId) => {
  return await mysqlDataSource.query(
    `
    SELECT
      u.id AS userId,
      u.profile_image AS userProfileImage,
      pi.post_informations AS postings
    FROM users u
    INNER JOIN (
      SELECT
        user_id,
        JSON_ARRAYAGG(
          JSON_OBJECT (
            "postingId", id,
            "postingImageUrl", post_image_url,
            "postingContent", content
          )
        ) AS post_informations
      FROM posts
      GROUP BY user_id
    ) pi
      ON pi.user_id = u.id
    WHERE u.id = ?;
    `,
    [userId]
  );
};

const updatePost = async (content, userId, postId) => {
  await mysqlDataSource.query(
    `
    UPDATE posts
    SET
      content = ?
    WHERE 
      user_id = ? AND id = ?
    `,
    [content, userId, postId]
  );

  return await mysqlDataSource.query(
    `
    SELECT
      u.id AS userId,
      u.profile_image AS userProfileImage,
      p.id AS postingId,
      p.post_image_url AS postingImageUrl,
      p.content AS postingContent
    FROM posts p
    INNER JOIN users u ON u.id = p.user_id
    WHERE u.id = ? AND p.id = ?
    `,
    [userId, postId]
  );
};

const deletePost = async (postId) => {
  await mysqlDataSource.query(
    `
    DELETE  
    FROM posts
    WHERE posts.id = ?
    `,
    [postId]
  );
};

module.exports = {
  createPost,
  getPost,
  getPostbyUser,
  updatePost,
  deletePost,
};
