const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');


// router.get('/', cartController.)
router.post('/', cartController.addcart)


module.exports = router;