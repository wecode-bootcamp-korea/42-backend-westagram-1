//앞선 레이어들을 모두 무사히 통과한 데이터들을 db에 업데이트
const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

AppDataSource.initialize()
.then(() => {
    console.log("Data Source has been initalized!")
})
.catch(err) => {
    console.error("Error occurred during Data Source initialization", err);
        AppDataSource.destroy();
}

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
}};

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
