const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const { createUser, signInUser, signOutUser } = require('../controllers/users');

const NotFoundError = require('../errors/NotFoundError');

const auth = require('../middlewares/auth');
const { validateUser, validateLogin } = require('../middlewares/validation');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, signInUser);
router.post('/signout', signOutUser);

router.use('/users', auth, users);
router.use('/movies', auth, movies);

router.use('*', auth, () => {
  throw new NotFoundError({ message: 'Страница не найдена' });
});

module.exports = router;
