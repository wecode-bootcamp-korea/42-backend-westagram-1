const mysqlDataSource = require('./daoModule');

const createUser = async (name, email, password, profileImage) => {
  await mysqlDataSource.query(
    `
    INSERT INTO users (
      name, 
      email, 
      password, 
      profile_image
    )
    VALUES (
      ?, 
      ?, 
      ?, 
      ?
    );
    `,
    [name, email, password, profileImage]
  );
};

const signInUser = async (email) => {
  return await mysqlDataSource.query(
    `
    SELECT
      id, 
      email, 
      password
    FROM users
    WHERE email=?
    `,
    [email]
  );
};

module.exports = {
  createUser,
  signInUser,
};
