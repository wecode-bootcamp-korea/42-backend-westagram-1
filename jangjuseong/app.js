require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');

const mysqlDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

mysqlDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
    mysqlDataSource.destroy();
  });

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// health check
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.post('/users/signup', async (req, res) => {
  const { name, email, password, profileImage } = req.body;

  await mysqlDataSource.query(
    `INSERT INTO users (
      name, 
      email, 
      password, 
      profile_image
    )
      VALUES (
        ?, 
        ?, 
        ?, 
        ?
        );
    `,
    [name, email, password, profileImage]
  );

  res.status(201).json({ message: 'userCreated' });
});

const PORT = process.env.PORT;
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}!!`));
  } catch (err) {
    console.error(err);
  }
};

start();
