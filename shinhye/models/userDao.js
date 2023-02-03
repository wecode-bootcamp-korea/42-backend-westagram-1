//앞선 레이어들을 모두 무사히 통과한 데이터들을 db에 업데이트
const AppDataSource = require("./index");

const createUser = async (
  username,
  firstName,
  lastName,
  age,
  email,
  hashedPassword,
  profileImage
) => {
  try {
    return await AppDataSource.query(
      `INSERT INTO users(
                  username,
                  first_name,
                  last_name,
                  age,
                  email,
                  password,
                  profile_image,
                  ) VALUES (?, ?, ?, ?, ?, ?, ?);
              `,
      [username, firstName, lastName, age, email, hashedPassword, profileImage]
    );
  } catch (err) {
    console.log(err);
    throw error;
  }
};

const getUser = async (email) => {
  try {
    return await AppDataSource.query(
      `SELECT
      *
      FROM users
      WHERE email = ?
      `,
      [email]
    );
  } catch (err) {
    console.log(err);
    throw error;
  }
};

module.exports = { createUser, getUser };
