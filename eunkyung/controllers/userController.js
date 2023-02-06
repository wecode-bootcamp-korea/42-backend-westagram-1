const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const { name, password, email, profileImage } = req.body;

    if (!name || !password || !email || !profileImage) {
      throw Error("Key Error!");
    }

    await userService.createUser(name, password, email, profileImage);
    return res.status(201).json({ message: "userCreated" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw Error("Key Error!");
    }

    const token = await userService.login(email, password);

    return res.status(200).json({ accessToken: token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  login,
};
