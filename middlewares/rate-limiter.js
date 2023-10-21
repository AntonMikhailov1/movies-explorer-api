const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1000,
  max: 5000,
  message: 'Слишком много запросов',
});

module.exports = limiter;
