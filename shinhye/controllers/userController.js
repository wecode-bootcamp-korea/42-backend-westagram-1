const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { email, profileImage, password } = req.body;
    if (!email || !password) {
      const err = new Error({ message: "KEY_ERROR" });
      err.statusCode = 400;
      throw err;
    }

    await userService.signUp(email, profileImage, password);
    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.login(email, password);
    let token = userService.login(jwtToken);
    return res.status(200).json({ JWT: token });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500), json({ message: err.message });
  }
};

module.exports = { signUp };
