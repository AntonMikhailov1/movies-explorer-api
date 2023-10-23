const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');

// const NotFoundError = require('../errors/NotFoundError');

const auth = require('../middlewares/auth');

// const { createUser, login } = require('../controllers/users');
// const { validateUser, validateLogin } = require('../middlewares/validation');

// router.post('/signup', validateUser, createUser);
// router.post('/signin', validateLogin, signInUser);
// router.post('/signout', signOutUser);

router.use('/users', auth, users);
router.use('/cards', auth, movies);

// router.use('*', auth, () => {
//   throw new NotFoundError({ message: 'Страница не найдена' });
// });

module.exports = router;
