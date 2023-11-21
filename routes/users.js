const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validateUserUpdate } = require('../middlewares/validation');

router.get('/me', getUser);
router.patch('/me', validateUserUpdate, updateUser);

module.exports = router;
