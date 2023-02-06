const mysqlDataSource = require('./dataSource');

const createLike = async (userId, postId) => {
  await mysqlDataSource.query(
    `
    INSERT INTO likes (
      user_id,
      post_id
    )
    VALUES (
      ?,
      ?
    );
    `,
    [userId, postId]
  );
};

module.exports = {
  createLike,
};
