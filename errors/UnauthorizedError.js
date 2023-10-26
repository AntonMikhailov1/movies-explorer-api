const { httpStatus } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = httpStatus.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
