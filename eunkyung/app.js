require("dotenv").config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
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

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' })
})

app.post('/sign_up', async (req, res, next) => {
    const { name, password, email, profile_image } = req.body
    await mysqlDataSource.query(
        `INSERT INTO users (
            name, 
            password, 
            email,
            profile_image
            ) 
            VALUES (
                ?,
                ?,
                ?,
                ?
                );`,
        [name, password, email, profile_image]
    )
    res.status(201).json({ message: 'userCreated' })
})



app.post('/posting', async (req, res) => {
    const { title, content, post_image_url, user_id } = req.body
    await mysqlDataSource.query(
        `INSERT INTO posts (
            title,
            content,
            post_image_url,
            user_id
        )
        VALUES (
            ?,
            ?,
            ?,
            ?
        );`,
        [title, content, post_image_url, user_id]
    )
    res.status(201).json({ message: 'postCreated' })
})

app.get('/posts', async (req, res) => {
    await mysqlDataSource.query(
        `SELECT
        users.id as userId,
        users.profile_image as userprofileImage,
        posts.user_id as postingId,
        posts.post_image_url as postingImageUrl,
        posts.content as postingContent 
        FROM users INNER JOIN posts ON users.id = posts.user_id`
        , (err, rows) => {
            res.status(201).json({ data: rows })
        }
    )
})


app.get('/posts/:userId', async (req, res) => {
    const { userId } = req.params;

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
                    'postingContent', posts.content
                ) 
            ) 
        as postings
        FROM posts 
        GROUP BY user_id  
        ) pp ON users.id = pp.user_id
            WHERE users.id = ${userId};`
        , (err, rows) => {
            res.status(201).json({ data: rows })
        }
    )
})

app.patch('/edit/:userId/:postId', async (req, res) => {
    const { userId, postId } = req.params;
    const { postingContent } = req.body

    await mysqlDataSource.query(
        `UPDATE posts 
        SET 
        posts.content = ? 
        WHERE posts.user_id = ${userId} AND posts.id = ${postId}
        `,
        [postingContent])


    await mysqlDataSource.query(
        `SELECT users.id as userId, users.name as userName, posts.id as postingId, posts.title as postingTitle, posts.content as postingContent FROM users INNER JOIN posts ON users.id = ${userId} AND posts.id = ${postId} WHERE users.id = posts.user_id`
        , (err, rows) => {
            res.status(201).json({ data: rows })
        }
    )
})

app.delete('/delete/:postId', async (req, res) => {
    const { postId } = req.params;

    await mysqlDataSource.query(
        `DELETE FROM posts WHERE posts.id = ${postId}`
    )
    res.status(201).json({ message: 'postingDeleted' })
})

app.post('/like', async (req, res) => {
    const { userId, postId } = req.body
    await mysqlDataSource.query(
        `INSERT INTO likes (
            user_id,
            post_id
        )
        VALUES (
            ?,
            ?
        )`,
        [userId, postId])
    res.status(201).json({ message: 'likeCreated' })
})




const PORT = process.env.PORT

const start = async () => {
    app.listen(PORT, () => {
        console.log(`server is listening on ${PORT}`)
    })
}

start()
