const httpStatus = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = httpStatus.CONFLICT;
  }
}

module.exports = ConflictError;
