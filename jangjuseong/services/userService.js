const userDao = require('../models/userDao');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const signUp = async (name, email, password, profileImage) => {
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
  const [userData] = await userDao.signInUser(email);

  const payLoad = { userId: userData.id };

  const checkHash = await bcrypt.compare(password, userData.password);
  if (!checkHash) {
    return res.status(401).json({ message: 'Invalid User' });
  }

  return jwt.sign(payLoad, SECRET_KEY);
};

module.exports = {
  signUp,
  signIn,
};
