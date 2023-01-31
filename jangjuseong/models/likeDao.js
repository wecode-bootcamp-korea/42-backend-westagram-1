const mysqlDataSource = require('./daoModule');

const postLike = async (userId, postId) => {
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
  postLike,
};
