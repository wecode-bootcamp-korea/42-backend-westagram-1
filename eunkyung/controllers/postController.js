const postService = require('../services/postService')


const createPost = async (req, res) => {
    const { title, content, postImageUrl, userId } = req.body
    await postService.createPost(title, content, postImageUrl, userId)
    return res.status(201).json({ message: 'POSTING_SUCCESS' })
}

const getPostByUserId = async (req, res) => {
    const { userId } = req.params;
    const [userPostResult] = await postService.getPostByUserId(userId)
    return res.status(200).json({ data: userPostResult })
}

const getPosts = async (req, res) => {
    const postListResult = await postService.getPosts()
    return res.status(200).json({ data: postListResult })
}

const updatePost = async (req, res) => {
    const { content, userId, postId } = req.body
    const updatePostResult = await postService.updatePost(content, userId, postId)
    res.status(201).json({ data: updatePostResult })
}

const deletePost = async (req, res) => {
    const { postId } = req.params
    await postService.deletePost(postId)
    return res.status(200).json({ message: `${postId} post deleted` })
}

module.exports = {
    createPost,
    getPostByUserId,
    getPosts,
    updatePost,
    deletePost
}