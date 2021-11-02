const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const middleware = require('../app/middleware/authenticate');

router.use('/about', siteController.about)
router.get('/:token', middleware, siteController.index1)
router.get('/', siteController.index)

module.exports = router;