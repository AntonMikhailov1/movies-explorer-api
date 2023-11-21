require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const rateLimiter = require('./middlewares/rate-limiter');

const router = require('./routes/index');

const { MONGO_URL, PORT } = require('./utils/config');

const app = express();

mongoose.connect(MONGO_URL);
mongoose.connection.once('open', () => {
  if (mongoose.connection.readyState === 1) {
    console.log('Database connected:', MONGO_URL);
  }
});

mongoose.connection.on('error', (err) => {
  console.error('connection error:', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet());
app.use(requestLogger);
app.use(rateLimiter);

app.use(cors);

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
