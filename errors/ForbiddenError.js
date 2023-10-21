const httpStatus = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = httpStatus.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
