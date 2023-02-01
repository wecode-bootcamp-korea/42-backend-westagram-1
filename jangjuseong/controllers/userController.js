const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    if (!name || !email || !password) {
      const err = new Error('⚠️ Key Error!');
      err.code = 400;
      throw err;
    }

    await userService.signUp(name, email, password, profileImage);

    res.status(201).json({ message: 'createUser' });
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error('⚠️ Key Error!');
      err.code = 400;
      throw err;
    }

    const result = await userService.signIn(email, password);

    return res.status(201).json({ accessToken: result });
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
};
