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
  const { username, firstName, lastName, age, email, password } = req.body;

  await AppDataSource.query(
    `INSERT INTO users(
      username, 
      first_name,
      last_name,
      age,
      email, 
      password
    ) VALUES (?, ?, ?, ?, ?, ?);
    `,
    [username, firstName, lastName, age, email, password]
  );

  return res.status(201).json({ message: "Successfully created!" });
});

// add a post
app.post("/posts", async (req, res) => {
  const { userID, userProfileImage, postImageURL, postContent } = req.body;

  await AppDataSource.query(
    `INSERT INTO posts(
      user_id, 
      user_profile_image,
      post_image_url,
      post_content
    ) VALUES (?, ?, ?, ?);
    `,
    [userID, userProfileImage, postImageURL, postContent]
  );

  return res.status(201).json({ message: "Successfully created!" });
});

// view all posts
app.get("/posts", async (req, res) => {
  const postData = await AppDataSource.query(
    `
    SELECT
    user_id as userID,
    user_profile_image as userProfileImage,
    id as postId,
    post_image_url as postImageUrl,
    post_content as postContent
    FROM posts;
    `
  );

  return res.status(200).send({ data: postData });
});

// view user's post
app.get("/posts/:userID", async (req, res) => {
  const { userID } = req.params;

  const userPosts = await AppDataSource.query(
    `SELECT
      p.user_id as userID,
      p.user_profile_image as userProfileImage,
      JSON_ARRAYAGG(
        JSON_OBJECT(
        'postingId', p.id,
        'postImageUrl', p.post_image_url,
        'postContent', p.post_content))
      AS postings
    FROM posts p
    WHERE p.user_id = ?
    GROUP BY user_id, user_profile_image;
    `,
    [userID]
  );
  res.status(200).json({ data: userPosts });
});

// update user's post
app.patch("/posts/:userID/:postID", async (req, res) => {
  const { userID, postID } = req.params;
  const { postContent } = req.body;

  await AppDataSource.query(
    `
    UPDATE posts
    SET
    post_content = ?
    WHERE user_id = ?
    AND id = ?;
    `,
    [postContent, userID, postID]
  );

  const updatedPost = await AppDataSource.query(
    `
    SELECT
    users.id as userID,
    users.username,
    posts.id as postID,
    posts.post_content as postContent
    FROM users
    INNER JOIN posts ON posts.user_id = users.id
    WHERE posts.user_id = ? 
    AND posts.id= ?;
    `,
    [userID, postID]
  );

  return res.status(200).json({ data: updatedPost });
});

// delete post
app.delete("/posts/:postID", async (req, res) => {
  const { postID } = req.params;

  await AppDataSource.query(
    `DELETE FROM likes
    WHERE liked_post_id = ?
    `,
    [postID]
  );

  await AppDataSource.query(
    `DELETE FROM posts
    WHERE id = ?
    `,
    [postID]
  );

  return res.status(200).json({ message: "Successfully deleted!" });
});

// like or unlike
app.patch("/likes", async (req, res) => {
  const { userID, postID } = req.body;
  await AppDataSource.query(
    ` INSERT INTO likes(
          like_user_ID,
          liked_post_ID
          ) VALUES (?, ?)
          ON DUPLICATE KEY UPDATE liked= NOT liked;
        `,
    [userID, postID]
  );
  res.status(200).json({ message: "Successfully updated!" });
});

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

start();
