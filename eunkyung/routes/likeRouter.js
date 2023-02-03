const express = require('express')

const likeController = require('../controllers/likeController')
const router = express.Router()

router.post('/', likeController.createLikePostByUserId)

module.exports = { router }
