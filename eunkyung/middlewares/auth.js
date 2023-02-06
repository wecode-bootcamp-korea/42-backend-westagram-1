require("dotenv").config();
const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      const err = new Error("YOU NEED OUR TOKEN!!!");
      throw err;
    }

    const decode = jwt.verify(
      token,
      process.env.SECRET_KEY,
      function (err, decoded) {
        if (err) {
          const err = new Error("THIS TOKEN IS INVALID!!!");
          throw err;
        } else {
          //console.log(decoded);
          return decoded;
        }
      }
    );
    //console.log(decode);
    const userForVal = await userDao.userForVal(decode.userId);

    if (!userForVal) {
      const err = new Error("YOU ARE NOT OUR MEMBER, ANYMORE!!");
      return err;
    }
    req.user = decode.userId;
    next();
  } catch (err) {
    return res.status(401).json(err.message);
  }
};

module.exports = {
  validateToken,
};
