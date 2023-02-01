const likeService = require('../services/likeService')


const createLikePostByUserId = async (req, res) => {
    const { userId, postId } = req.body

    await likeService.createLikePostByUserId(userId, postId)
    return res.status(201).json({ message: 'Like Success' })

}


module.exports = { createLikePostByUserId }