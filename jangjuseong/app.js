require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const { globalErrorHandler } = require('./utils/error-handler');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);
app.use(globalErrorHandler);

// health check
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
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
