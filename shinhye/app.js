require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/ping", (req, res) => {
  return res.json({ message: "pong" });
});

// create a user
app.post("/users/signup", async (req, res) => {
  const { username, firstName, lastName, age, email, password, profileImage } =
    req.body;

  await AppDataSource.query(
    `INSERT INTO users(
      username, 
      first_name,
      last_name,
      age,
      email, 
      password,
      profile_image
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `,
    [username, firstName, lastName, age, email, password]
  );

  return res.status(201).json({ message: "Successfully created!" });
});

// add a post
app.post("/posts", async (req, res) => {
  const { userId, ImageURL, Content } = req.body;

  await AppDataSource.query(
    `INSERT INTO posts(
      user_id,
      image_url,
      content
    ) VALUES (?, ?, ?);
    `,
    [userId, ImageURL, Content]
  );

  return res.status(201).json({ message: "Successfully created!" });
});

// view all posts
app.get("/posts", async (req, res) => {
  const postData = await AppDataSource.query(
    `
    SELECT
      posts.user_id as userId,
      users.profile_image as userProfileImage,
      posts.id as postId,
      posts.image_url as postImageUrl,
      posts.content as postContent
    FROM posts
    JOIN users
    ON posts.user_id=users.id;
    `
  );

  return res.status(200).send({ data: postData });
});

// view user's post
app.get("/posts/:userId", async (req, res) => {
  const { userId } = req.params;

  const userPosts = await AppDataSource.query(
    `SELECT
      p.user_id as userId,
      p.profile_image as userProfileImage,
      JSON_ARRAYAGG(
        JSON_OBJECT(
        'postingId', p.id,
        'postImageUrl', p.image_url,
        'postContent', p.content))
      AS postings
    FROM posts p
    WHERE p.user_id = ?
    GROUP BY user_id, user_profile_image;
    `,
    [userId]
  );
  console.log(typeof userPosts);
  res.status(200).json({ data: userPosts });
});

// update user's post
app.patch("/posts/:userId/:postId", async (req, res) => {
  const { userId, postId } = req.params;
  const { postContent } = req.body;

  await AppDataSource.query(
    `
    UPDATE posts
    SET post_content = ?
    WHERE user_id = ?
    AND id = ?;
    `,
    [postContent, userId, postId]
  );

  const updatedPost = await AppDataSource.query(
    `
    SELECT
      users.id as userId,
      users.username,
      posts.id as postId,
      posts.post_content as postContent
    FROM users
    INNER JOIN posts ON posts.user_id = users.id
    WHERE posts.user_id = ? 
    AND posts.id= ?;
    `,
    [userId, postId]
  );

  return res.status(200).json({ data: updatedPost });
});

// delete post
app.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;

  await AppDataSource.query(
    `DELETE FROM likes
    WHERE post_id = ?
    `,
    [postId]
  );

  await AppDataSource.query(
    `DELETE FROM posts
    WHERE id = ?
    `,
    [postId]
  );

  return res.status(200).json({ message: "Successfully deleted!" });
});

// like or unlike
app.patch("/likes", async (req, res) => {
  const { userId, postId } = req.body;
  await AppDataSource.query(
    ` INSERT INTO likes(
        user_Id,
        post_Id
      ) VALUES (?, ?)
      ON DUPLICATE KEY UPDATE liked= NOT liked;
    `,
    [userId, postId]
  );
  res.status(200).json({ message: "Successfully updated!" });
});

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

start();
