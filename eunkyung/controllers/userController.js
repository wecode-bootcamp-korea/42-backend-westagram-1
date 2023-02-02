const userService = require("../services/userService");

const createUser = async (req, res) => {
  const { password, email } = req.body;
  const name = "이아무게";
  const profileImage = "🫐";
  await userService.createUser(name, password, email, profileImage);
  return res.status(201).json({ message: "userCreated" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const emailCheckLogin = await userService.emailCheckLogin(email, password);
  if (!emailCheckLogin) {
    return res.status(400).json({ message: "please SignUp" });
  }
  if (emailCheckLogin === "wrongPw") {
    return res.status(400).json({ message: "please check your password" });
  } else {
    return res.status(200).json({ accessToken: emailCheckLogin });
  }
};

module.exports = {
  createUser,
  login,
};
