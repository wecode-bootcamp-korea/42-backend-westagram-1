const { mysqlDataSource } = require('./datasource')

const createUser = async (name, password, email, profileImage) => {
    return await mysqlDataSource.query(
        `INSERT INTO users (
         name, 
         password, 
         email,
         profile_image
         ) 
         VALUES (?, ?, ?, ?);`,
        [name, password, email, profileImage]
    )
}

const userProfile = async (userId) => {
    return await mysqlDataSource.query(
        `SELECT
                users.id as userId,
                users.profile_image as userprofileImage,
                pp.postings
        FROM users
            LEFT JOIN (
                SELECT 
                    user_id,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'postingId', posts.id,
                            'postingImageUrl', posts.post_image_url,
                            'postingContent', posts.content) 
                    ) as postings
                FROM posts 
                GROUP BY user_id) pp 
        ON users.id = pp.user_id
        WHERE users.id = ?;`,
        [userId])
}

module.exports = {
    createUser,
    userProfile
}
