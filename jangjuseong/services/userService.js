const userDao = require('../models/userDao');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validate = require('../utils/validate-user');

const SECRET_KEY = process.env.SECRET_KEY;

const signUp = async (name, email, password, profileImage) => {
  await validate.validatePassword(password);
  await validate.validateEmail(email);

  const [userInfo] = await userDao.getUserByEmail(email);

  if (userInfo) {
    const err = new Error('Email Already Exists.');
    err.code = 400;
    throw err;
  }

  const saltRounds = 12;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const createUser = await userDao.createUser(
    name,
    email,
    hashPassword,
    profileImage
  );

  return createUser;
};

const signIn = async (email, password) => {
  await validate.validatePassword(password);
  await validate.validateEmail(email);

  const [userData] = await userDao.getUserByEmail(email);

  const payLoad = { userId: userData.id };

  const checkHash = await bcrypt.compare(password, userData.password);
  if (!checkHash) {
    const err = new Error('Invalid User');
    err.code = 401;
    throw err;
  }

  return jwt.sign(payLoad, SECRET_KEY);
};

module.exports = {
  signUp,
  signIn,
};
