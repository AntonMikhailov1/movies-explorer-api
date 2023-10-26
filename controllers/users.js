/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { httpStatus, errorMessages } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const { JWT_SECRET } = require('../utils/config');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.NOT_FOUND_USER_MESSAGE);
      }
      res.status(httpStatus.OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(BadRequestError(errorMessages.INCORRECT_DATA_MESSAGE));
      } else next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      })
        .then((user) => {
          const data = user.toObject();
          delete data.password;
          res.status(httpStatus.CREATED).send(data);
        })
        .catch((err) => {
          if (err.code === 11000) {
            return next(
              new ConflictError(errorMessages.CONFLICT_USER_MESSAGE),
            );
          }
          if (err instanceof mongoose.Error.ValidationError) {
            return next(
              new BadRequestError(errorMessages.INCORRECT_USER_DATA_MESSAGE),
            );
          }
          next(err);
        });
    })
    .catch(next);
};

const signInUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Авторизация прошла успешно' });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(
          new BadRequestError(errorMessages.INCORRECT_USER_DATA_MESSAGE),
        );
      }
      next(err);
    });
};

const signOutUser = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли из системы' });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.NOT_FOUND_USER_MESSAGE);
      }
      res.status(httpStatus.OK).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(
          new ConflictError(errorMessages.CONFLICT_USER_MESSAGE),
        );
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(
          new BadRequestError(errorMessages.INCORRECT_DATA_MESSAGE),
        );
      }
      next(err);
    });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  signInUser,
  signOutUser,
};
