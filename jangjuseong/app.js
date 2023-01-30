require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');
const bcrypt = require('bcrypt');

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

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

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
    [name, email, hashedPassword, profileImage]
  );

  return res.status(201).json({ message: 'userCreated' });
});

app.post('/posts', async (req, res) => {
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

  return res.status(201).json({ message: 'postCreated' });
});

app.get('/posts', async (req, res) => {
  const posts = await mysqlDataSource.query(
    `SELECT
      u.id AS userId,
      u.profile_image AS userProfileImage,
      p.id AS postingId,
      p.post_image_url AS postingImageUrl,
      p.content AS postingContent
    FROM posts p
    INNER JOIN users u ON u.id = p.user_id;
    `
  );

  return res.status(200).json({ posts });
});

app.get('/posts/:userId', async (req, res) => {
  const { userId } = req.params;

  const [result] = await mysqlDataSource.query(
    `
    SELECT
      u.id AS userId,
      u.profile_image AS userProfileImage,
      pi.post_informations AS postings
    FROM users u
    INNER JOIN (
      SELECT
        user_id,
        JSON_ARRAYAGG(
          JSON_OBJECT (
            "postingId", id,
            "postingImageUrl", post_image_url,
            "postingContent", content
          )
        ) AS post_informations
      FROM posts
      GROUP BY user_id
    ) pi
      ON pi.user_id = u.id
    WHERE u.id = ?;
    `,
    [userId]
  );

  return res.status(200).json({ data: result });
});

app.patch('/posts/:postId/:userId', async (req, res) => {
  const { userId, postId } = req.params;
  const { content } = req.body;

  await mysqlDataSource.query(
    `UPDATE posts
    SET
      content = ?
    WHERE 
      user_id = ? AND id = ?
    `,
    [content, userId, postId]
  );

  const [result] = await mysqlDataSource.query(
    `
    SELECT
      u.id AS userId,
      u.profile_image AS userProfileImage,
      p.id AS postingId,
      p.post_image_url AS postingImageUrl,
      p.content AS postingContent
    FROM posts p
    INNER JOIN users u ON u.id = p.user_id
    WHERE u.id = ? AND p.id = ?
    `,
    [userId, postId]
  );

  return res.status(201).json({ data: result });
});

app.delete('/posts/:postId', async (req, res) => {
  const { postId } = req.params;

  await mysqlDataSource.query(
    `DELETE
    FROM posts
    WHERE posts.id = ?
    `,
    [postId]
  );

  return res.status(200).json({ message: 'postingDeleted' });
});

app.post('/likes/:userId/:postId', async (req, res) => {
  const { userId, postId } = req.params;

  await mysqlDataSource.query(
    `INSERT INTO likes (
      user_id,
      post_id
    )
      VALUES (
        ?, 
        ?
        );
    `,
    [userId, postId]
  );

  return res.status(201).json({ message: 'likeCreated' });
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
