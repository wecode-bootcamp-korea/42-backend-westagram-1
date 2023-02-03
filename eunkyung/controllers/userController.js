const userService = require("../services/userService");

const createUser = async (req, res) => {
  const { name, password, email, profileImage } = req.body;

  await userService.createUser(name, password, email, profileImage);
  return res.status(201).json({ message: "userCreated" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginSuccess = await userService.login(email, password);

    return res.status(200).json({ accessToken: loginSuccess });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  login,
};
