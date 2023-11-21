const { httpStatus } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = httpStatus.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
