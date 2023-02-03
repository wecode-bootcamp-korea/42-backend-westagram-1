const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/users/signup", userController.signUp);
router.post("/users/login", userController.login);

module.exports = { router };
