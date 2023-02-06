const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { catchAsync } = require('../utils/error-handler');

router.post('/signup', catchAsync(userController.signUp));
router.post('/signin', catchAsync(userController.signIn));

module.exports = {
  router,
};
