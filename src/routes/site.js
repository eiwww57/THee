const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.use('/', siteController.index)
router.use('/about', siteController.about)

module.exports = router;