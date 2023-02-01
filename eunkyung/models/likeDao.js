const { mysqlDataSource } = require('./datasource')

const createLikePostByUserId = async (userId, postId) => {
    return await mysqlDataSource.query(
        `INSERT INTO likes (
                user_id,
                post_id)
            VALUES (
                ?,
                ?)`,
        [userId, postId])
}



module.exports = {
    createLikePostByUserId
}