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

  res.status(200).json({ message: 'userCreated' });
});

app.post('/users/post', async (req, res) => {
  const { title, content, postImgUrl, userId } = req.body;

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
          );
      `,
    [title, content, postImgUrl, userId]
  );

  res.status(200).json({ message: 'postCreated' });
});

app.get('/lookup', async (req, res) => {
  await mysqlDataSource.manager.query(
    `SELECT
    u.id AS userId,
    u.profile_image AS userProfileImage,
    p.id AS postingId,
    p.post_image_url AS postingImageUrl,
    p.content AS postingContent
    FROM posts p
    JOIN users u ON u.id = p.user_id;
    `,
    (err, data) => {
      res.status(200).json({ data });
    }
  );
});

app.get('/users/lookup', async (req, res) => {
  await mysqlDataSource.manager.query(
    `SELECT
    u.id AS userId,
    u.profile_image AS userProfileImage,
    JSON_ARRAYAGG(postings_json.posting_id) AS postings
    FROM users u
    INNER JOIN (
    SELECT
    p.id,
    JSON_OBJECT(
      "postingId", id,
      "postingImageUrl", post_image_url,
      "postingContent", content
      ) AS posting_id
      FROM posts p
    ) postings_json
    WHERE u.id=1;
    `,
    (err, data) => {
      res.status(200).json({ data });
    }
  );
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
