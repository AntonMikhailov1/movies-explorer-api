const router = require('express').Router();

router.get('/me', getUser);
router.patch('/user', updateUser);
