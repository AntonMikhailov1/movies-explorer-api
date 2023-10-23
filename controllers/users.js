/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { httpStatus } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError({
          message: 'Пользователь по указанному id не найден',
        });
      }
      res.status(httpStatus.OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(BadRequestError({ message: 'Переданы некорректные данные' }));
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
              new ConflictError({
                message: 'Пользователь с таким email уже существует',
              }),
            );
          }
          if (err instanceof mongoose.Error.ValidationError) {
            return next(
              new BadRequestError({
                message:
                  'Переданы некоректные данные при создании пользователя',
              }),
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
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
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
    .catch(next);
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
        throw new NotFoundError({ message: 'Пользователь не найден' });
      }
      res.status(httpStatus.OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(
          new BadRequestError({
            message: 'Переданы некорректные данные при обновлении пофиля',
          }),
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
