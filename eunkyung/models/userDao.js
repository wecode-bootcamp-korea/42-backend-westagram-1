const { DataSource } = require('typeorm')

const mysqlDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

mysqlDataSource.initialize()
    .then(() => {
        console.log('data server has been initialized!')
    })

    .catch(err => {
        console.log('Failed to Connect Database')
    })

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
    await mysqlDataSource.query(
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
    createUser, userProfile
}
