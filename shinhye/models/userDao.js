const { AppDataSource } = require("./index");

const createUser = async (email, profileImage, password) => {
  try {
    await AppDataSource.query(
      `INSERT INTO users(
                  email,
                  profile_image,
                  password
                  ) VALUES (?, ?, ?);
              `,
      [email, profileImage, password]
    );
  } catch (err) {
    console.log(err);
    throw error;
  }
};

const checkEmail = async (email) => {
  try {
    const userInfo = await AppDataSource.query(
      `SELECT
      id,
      email
      FROM users
      WHERE email = ?
      `,
      [email]
    );

    return userInfo;
  } catch (err) {
    console.log(err);
    throw error;
  }
};

module.exports = { createUser, checkEmail };
