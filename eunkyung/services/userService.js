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

const emailCheckLogin = async (email, password) => {
  const [userInfo] = await userDao.emailCheckLogin(email);
  if (!userInfo) {
    return undefined;
  }
  const checkPw = await bcrypt.compare(password, userInfo.password);

  if (checkPw === true) {
    const payLoad = { exp: 60000 };
    const secretKey = "mySecretKey";
    return jwt.sign(payLoad, secretKey);
  } else {
    return "wrongPw";
  }
};

module.exports = {
  createUser,
  emailCheckLogin,
};
