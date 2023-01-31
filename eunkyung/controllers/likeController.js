const likeService = require('../services/likeService')


const likePost = async (req, res) => {
    const { userId, postId } = req.body
    await likeService.likePost(userId, postId)
    return res.status(201).json({ message: 'I like this POST' })
}


module.exports = { likePost }