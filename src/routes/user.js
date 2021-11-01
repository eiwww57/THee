const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const authenticate = require('../app/middleware/authenticate');

router.post('/signup', userController.register)
router.get('/login', userController.login)
router.post('/auth', userController.auth)
router.get('/', authenticate, userController.signup)


module.exports = router;