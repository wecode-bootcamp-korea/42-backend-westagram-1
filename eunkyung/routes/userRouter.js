const express = require("express");
const { emailValidation, pwValidation } = require("../utils/user-validator");
//const { pwValidation } = require("../utils/user-validator");

const userController = require("../controllers/userController");
const router = express.Router();

router.post(
  "/signup",
  emailValidation,
  pwValidation,
  userController.createUser
);
router.post("/login", userController.login);

module.exports = {
  router,
};
