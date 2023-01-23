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

//health check
app.get("/ping", (req, res) => {
  return res.json({ message: "pong" });
});

//create user
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

  res.status(201).json({ message: "Successfully created!" });
});

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

start();
