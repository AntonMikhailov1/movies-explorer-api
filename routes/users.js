const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validateUser, validateUserUpdate } = require('../middlewares/validation');

router.get('/me', validateUser, getUser);
router.patch('/me', validateUserUpdate, updateUser);

module.exports = router;
