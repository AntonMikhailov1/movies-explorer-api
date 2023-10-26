const { httpStatus, errorMessages } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
    return;
  }
  res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .send({ message: errorMessages.INTERNAL_SERVER_ERROR_MESSAGE });

  next();
};

module.exports = errorHandler;
