const http = require('http')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')

dotenv.config()

const { DataSource } = require('typeorm')

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
    .then(() => { console.log('data server has been initialized!') })

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' })
})

app.post('/sign_up', async (req, res, next) => {
    const { name, password, email } = req.body
    await myDataSource.query(
        `INSERT INTO users (
            name, 
            password, 
            email) 
            VALUES (?,?,?);`,
        [name, password, email]
    )
    res.status(201).json({ message: 'userCreated' })
})



const server = http.createServer(app)
const PORT = process.env.PORT

const start = async () => { server.listen(PORT, () => { console.log(`server is listening on ${PORT}`) }) }

start()
