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
    console.log("Data Source has been initalized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
    AppDataSource.destroy();
  });

module.exports = AppDataSource;
