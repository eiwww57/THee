const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.post('/signup', userController.register)
router.get('/login', userController.login)
router.post('/auth', userController.auth)
router.get('/cart', userController.cart)
router.get('/', userController.signup)


module.exports = router;