const postDao = require('../models/postDao')

const createPost = async (title, content, postImageUrl, userId) => {
    const createPost = await postDao.createPost(
        title,
        content,
        postImageUrl,
        userId
    )
    return createPost
}

const getPostByUserId = async (userId) => {
    return await postDao.getPostByUserId(userId)
}

const getPosts = async () => {
    return await postDao.getPosts()
}

const updatePost = async (content, userId, postId) => {
    const updatePostResult = await postDao.updatePost(
        content,
        userId,
        postId
    )
    return updatePostResult
}

const deletePost = async (postId) => {
    return await postDao.deletePost(postId)
}


module.exports = { createPost, getPostByUserId, getPosts, updatePost, deletePost }

