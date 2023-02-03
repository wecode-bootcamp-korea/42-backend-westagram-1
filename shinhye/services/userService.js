//service - 비즈니스 규칙과 로직이 접목되는 레이어
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const saltRounds = 12;
const secretKey = process.env.SECRET_KEY;

const signUp = async (name, email, profile_image, password) => {
  // 비밀번호 규칙
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  // 비밀번호 규칙 검사
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  //이메일 중복 검사
  const [userInfo] = await userDao.getUser(email);
  if (email === userInfo.email) {
    const err = new Error("USER_ALREADY_EXISTS");
    err.statusCode = 409;
    throw err;
  }

  // bcrypt 모듈로 사용자 비밀번호 암호화하기
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const createUser = await userDao.createUser(
    name,
    email,
    profile_image,
    hashedPassword
  );

  return createUser;
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

module.exports = { signUp, login };
