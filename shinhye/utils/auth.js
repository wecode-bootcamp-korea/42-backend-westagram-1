// const { access } = require("fs");
// const jwt = require("jsonwebtoken");
// const { promisify } = require("util");

// const { userService } = require("../services");
// const loginRequired = async (req, res, next) => {
//   const accessToken = req.headers.authorization;
//   if (!accessToken) {
//     const error = new Error("NEED_ACCESS_TOKEN");
//     error.statusCode = 401;

//     return res.status(error.statusCode).json({ message: error.message });
//   }
// };

// const decoded = await promisify(jwt.verify)(
//   accessToken,
//   process.env.JWT_SECRET
// );

// const user = await userService.getUserById(decoded.id)

// const loginRequired
