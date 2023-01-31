const likeDao = require('../models/likeDao')

const likePost = async (userId, postId) => {
    return await likeDao.likePostResult(userId, postId)
}

module.exports = { likePost }