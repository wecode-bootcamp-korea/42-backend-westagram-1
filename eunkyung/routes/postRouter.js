const express = require('express')

const postController = require('../controllers/postController')
const router = express.Router()

router.post('/', postController.posting)
router.get('/', postController.postList)
router.get('/:userId', postController.userPost)
router.patch('/', postController.updatePost)
router.delete('/:postId', postController.deletePost)

module.exports = { router }