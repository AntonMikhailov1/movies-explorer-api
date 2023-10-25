const mongoose = require('mongoose');
const Movie = require('../models/movie');
const { httpStatus } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (res, next) => {
  Movie.find({})
    .then((cards) => res.status(httpStatus.OK).send(cards))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRu,
    nameEn,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRu,
    nameEn,
  })
    .then((card) => res.status(httpStatus.CREATED).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(
          new BadRequestError({
            message: 'Переданы некорректные данные при создании карточки',
          }),
        );
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(
          new NotFoundError({ message: 'Карточка с указанным id не найдена' }),
        );
      }
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError({ message: 'Нет доступа' }));
      }
      return card
        .deleteOne()
        .then(() => res
          .status(httpStatus.OK)
          .send({ message: 'Карточка успешно удалена' }));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError({ message: 'Переданы некорректные данные' }));
      } else {
        next(err);
      }
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
