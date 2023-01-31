const express = require('express')
const postController = require('../controllers/postController')

const router = express.Router()

router.post('/posting', postController.posting)
router.get('/user/:userId', postController.userPost)
router.get('/list', postController.postList)
router.patch('/update', postController.updatePost)
router.delete('/delete/:postId', postController.deletePost)

module.exports = { router }



