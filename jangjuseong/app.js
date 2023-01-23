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

app.post('/posts/users', async (req, res) => {
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

  res.status(201).json({ message: 'postCreated' });
});

app.get('/posts/lookup', async (req, res) => {
  await mysqlDataSource.query(
    `SELECT
      u.id AS userId,
      u.profile_image AS userProfileImage,
      p.id AS postingId,
      p.post_image_url AS postingImageUrl,
      p.content AS postingContent
    FROM posts p
    INNER JOIN users u ON u.id = p.user_id;
    `,
    (err, data) => {
      res.status(200).json({ data });
    }
  );
});

app.get('/posts/lookup/:userId', async (req, res) => {
  const { userId } = req.params;

  await mysqlDataSource.query(
    `SELECT
    u.id AS userId,
    u.profile_image AS userProfileImage,
    pi.post_informations AS postings
    FROM
      users u
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
      FROM
        posts
      GROUP BY
        user_id
    ) pi 
      ON pi.user_id = u.id
    WHERE
      u.id = ${userId};
    `,
    (err, data) => {
      res.status(200).json({ data });
    }
  );
});

app.patch('/posts/update/:userId/:postId', async (req, res) => {
  const { userId, postId } = req.params;
  const { content } = req.body;
  await mysqlDataSource.query(
    `UPDATE posts
    SET
      content = ?
    WHERE 
      user_id = ${userId} AND id = ${postId}
    `,
    [content]
  );

  await mysqlDataSource.query(
    `SELECT
      u.id AS userId,
      u.profile_image AS userProfileImage,
      p.id AS postingId,
      p.post_image_url AS postingImageUrl,
      p.content AS postingContent
    FROM posts p
    INNER JOIN users u ON u.id = p.user_id
    WHERE u.id=${userId} AND p.id=${postId}
    `,
    (err, data) => {
      res.status(201).json({ data });
    }
  );
});

app.delete('/posts/delete/:postId', async (req, res) => {
  const { postId } = req.params;

  await mysqlDataSource.query(
    `DELETE 
    FROM posts
    WHERE posts.id = ${postId}
    `
  );
  res.status(200).json({ message: 'postingDeleted' });
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

  res.status(201).json({ message: 'likeCreated' });
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
