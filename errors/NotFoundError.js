const httpStatus = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = httpStatus.NOT_FOUND;
  }
}

module.exports = NotFoundError;
