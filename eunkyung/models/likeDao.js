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
        console.log('Data server has been initiallized!')
    })

    .catch(err => {
        console.log('Failed to connect database')
    })

const likePostResult = async (userId, postId) => {
    return await mysqlDataSource.query(
        `INSERT INTO likes (
                user_id,
                post_id)
            VALUES (
                ?,
                ?)`,
        [userId, postId])
}

module.exports = { likePostResult }