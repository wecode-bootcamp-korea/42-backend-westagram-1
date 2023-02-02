const { mysqlDataSource } = require("./datasource");

const createPost = async (title, content, postImageUrl, userId) => {
  return await mysqlDataSource.query(
    `INSERT INTO posts (
      title,
      content, 
      post_image_url,
      user_id
    )
    VALUES (?,?,?,?);`,
    [title, content, postImageUrl, userId]
  );
};

const getPostByUserId = async (userId) => {
  return await mysqlDataSource.query(
    `SELECT
    users.id as userId,
    users.profile_image as userprofileImage,
    pp.postings
    FROM users
    LEFT JOIN (
      SELECT 
        user_id,
        JSON_ARRAYAGG(
        JSON_OBJECT(
          'postingId', posts.id,
          'postingImageUrl', posts.post_image_url,
          'postingContent', posts.content) 
          ) as postings
      FROM posts GROUP BY user_id) pp 
  ON users.id = pp.user_id
  WHERE users.id = ?;`,
    [userId]
  );
};

const getPosts = async () => {
  return await mysqlDataSource.query(
    `SELECT
      users.id as userId,
      users.profile_image as userprofileImage,
      posts.user_id as postingId,
      posts.post_image_url as postingImageUrl,
      posts.content as postingContent 
    FROM posts 
    INNER JOIN users ON users.id = posts.user_id`
  );
};

const updatePost = async (content, userId, postId) => {
  await mysqlDataSource.query(
    `UPDATE 
      posts 
    SET 
      posts.content = ? 
    WHERE posts.user_id = ? AND posts.id = ?`,
    [content, userId, postId]
  );

  const [result] = await mysqlDataSource.query(
    `SELECT 
      users.id as userId, 
      users.name as userName, 
      posts.id as postingId, 
      posts.title as postingTitle, 
      posts.content as postingContent 
    FROM users 
    INNER JOIN posts ON users.id = ? AND posts.id = ? 
    WHERE users.id = posts.user_id`,
    [userId, postId]
  );
  return result;
};

const deletePost = async (postId) => {
  await mysqlDataSource.query(`DELETE FROM posts WHERE posts.id = ?`, [postId]);
};

module.exports = {
  createPost,
  getPostByUserId,
  getPosts,
  updatePost,
  deletePost,
};
