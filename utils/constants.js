const httpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const errorMessages = {
  INCORRECT_MOVIE_DATA_MESSAGE: 'Переданы некорректные данные при создании фильма',
  INCORRECT_USER_DATA_MESSAGE: 'Переданы некоректные данные при создании пользователя',
  INCORRECT_DATA_MESSAGE: 'Переданы некорректные данные',
  NOT_FOUND_MOVIE_MESSAGE: 'Фильм с указанным id не найден',
  NOT_FOUND_USER_MESSAGE: 'Пользователь с указанным id не найден',
  FORBIDDEN_MESSAGE: 'Нет доступа',
  CONFLICT_USER_MESSAGE: 'Пользователь с таким email уже существует',
  AUTHORIZATION_ERROR_MESSAGE: 'Неправильный email или пароль',
  MISSING_TOKEN_MESSAGE: 'Отсутствует токен авторизации',
  MISSING_USER_MESSAGE: 'Пользователя не существует',
  UNAUTHORIZED_MESSAGE: 'Необходима авторизация',
  INTERNAL_SERVER_ERROR_MESSAGE: 'Ошибка сервера',
};

module.exports = {
  httpStatus,
  errorMessages,
};
