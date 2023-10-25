// require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const rateLimiter = require('./middlewares/rate-limiter');

const router = require('./routes/index');

const MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const PORT = 3000;

const app = express();

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet());
app.use(requestLogger);
app.use(rateLimiter);

app.use(cors);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello World!' });
});

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
