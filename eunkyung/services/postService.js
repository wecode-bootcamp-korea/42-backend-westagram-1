const postDao = require('../models/postDao')

const posting = async (title, content, postImageUrl, userId) => {
    const createPost = await postDao.createPost(
        title,
        content,
        postImageUrl,
        userId
    )
    return createPost
}

const userPost = async (userId) => {
    return await postDao.userPostResult(userId)
}

const postList = async () => {
    return await postDao.postListResult()
}

const updatePost = async (content, userId, postId) => {
    const updatePostResult = await postDao.updatePostResult(
        content,
        userId,
        postId
    )
    return updatePostResult
}

const deletePost = async (postId) => {
    return await postDao.deletePostResult(postId)
}


module.exports = { posting, userPost, postList, updatePost, deletePost }

