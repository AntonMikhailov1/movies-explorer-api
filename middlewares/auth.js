const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET } = require('../utils/config');
const { errorMessages } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError(errorMessages.MISSING_TOKEN_MESSAGE));
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    return next(new UnauthorizedError(errorMessages.UNAUTHORIZED_MESSAGE));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
