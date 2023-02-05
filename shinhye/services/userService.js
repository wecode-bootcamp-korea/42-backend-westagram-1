require("dotenv").config();
const bcrypt = require("bcrypt");
const userDao = require("../models/userDao");

const signUp = async (email, profileImage, password) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 400;
    throw err;
  }

  const userInfo = await userDao.checkEmail(email);
  if (email === userInfo.email) {
    const err = new Error("USER_ALREADY_EXISTS");
    err.statusCode = 409;
    throw err;
  }

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return userDao.createUser(email, profileImage, hashedPassword);
};

const login = async (email, password) => {
  try {
    const [userInfo] = await userDao.getUser(email);
    const comparePassword = await bcrypt.compare(password, userInfo.password);
    if (!comparePassword) {
      const err = new Error("INVALID_PASSWORD");
      err.statusCode = 401;
      throw err;
    }
    await userDao.loginUser(email, password);

    const payLoad = { email: email };
    const jwtToken = await jwt.sign(payLoad, secretKey);
    return jwtToken;
  } catch {
    const error = new Error("INVALID_DATA");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { signUp };
