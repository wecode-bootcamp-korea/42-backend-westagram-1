require("dotenv").config()

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
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
    const { name, password, email } = req.body
    await mysqlDataSource.query(
        `INSERT INTO users (
            name, 
            password, 
            email
            ) 
            VALUES (
                ?,
                ?,
                ?
                );`,
        [name, password, email]
    )
    res.status(201).json({ message: 'userCreated' })
})



const PORT = process.env.PORT

const start = async () => {
    app.listen(PORT, () => {
        console.log(`server is listening on ${PORT}`)
    })
}

start()
