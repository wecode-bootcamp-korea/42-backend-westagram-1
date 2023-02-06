const emailValidation = async (req, res, next) => {
  try {
    const { email } = req.body;

    const emailVal = new RegExp("^(?=.*[a-zA-Z])(?=.*[@])(?=.{8,20})");
    console.log(email);
    if (!emailVal.test(email)) {
      throw new Error("PLEASE ADD @");
    }
    next();
  } catch (err) {
    return res.status(401).json(err.message);
  }
};

const pwValidation = async (req, res, next) => {
  try {
    const { password } = req.body;
    const pwVal = new RegExp(
      "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
    );
    console.log(password);
    if (!pwVal.test(password)) {
      throw new Error(
        "PLEASE MAKE PASSWORD WITH ALPHABET, NUMBER AND SPECIAL SYMBOLS"
      );
    }
    next();
  } catch (err) {
    return res.status(401).json(err.message);
  }
};

module.exports = { emailValidation, pwValidation };
