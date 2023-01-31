const postService = require('../services/postService')


const posting = async (req, res) => {
    const { title, content, postImageUrl, userId } = req.body
    await postService.posting(title, content, postImageUrl, userId)
    return res.status(201).json({ message: 'POSTING_SUCCESS' })
}

const userPost = async (req, res) => {
    const { userId } = req.params;
    const [userPostResult] = await postService.userPost(userId)
    return res.status(201).json({ data: userPostResult })
}

const postList = async (req, res) => {
    const postListResult = await postService.postList()
    return res.status(201).json({ data: postListResult })
}

const updatePost = async (req, res) => {
    const { content, userId, postId } = req.body
    const updatePostResult = await postService.updatePost(content, userId, postId)
    res.status(201).json({ data: updatePostResult })
}

const deletePost = async (req, res) => {
    const { postId } = req.params
    await postService.deletePost(postId)
    return res.status(201).json({ message: `${postId} post deleted` })
}

module.exports = {
    posting,
    userPost,
    postList,
    updatePost,
    deletePost
}