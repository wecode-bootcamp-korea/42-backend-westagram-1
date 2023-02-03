const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (name, password, email, profileImage) => {
  const saltRounds = 12;
  const hashedPw = await bcrypt.hash(password, saltRounds);

  const createUserResult = await userDao.createUser(
    name,
    hashedPw,
    email,
    profileImage
  );
  return createUserResult;
};

const login = async (email, password) => {
  const [userInfo] = await userDao.getUserByEmail(email);
  if (!userInfo) {
    throw new Error("Please signUp!!!!");
  }
  const checkPw = await bcrypt.compare(password, userInfo.password);
  const payLoad = { userId: userInfo.id };
  const secretKey = process.env.secretKey;

  if (!checkPw) {
    throw new Error("please check your password");
  }

  return jwt.sign(payLoad, secretKey);
};

module.exports = {
  createUser,
  login,
};
