const userService = require('../services/userService');

const signUp = async (req, res) => {
  const { name, email, password, profileImage } = req.body;

  await userService.signUp(name, email, password, profileImage);

  res.status(201).json({ message: 'createUser' });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const result = await userService.signIn(email, password);

  return res.status(200).json({ accessToken: result });
};

module.exports = {
  signUp,
  signIn,
};
