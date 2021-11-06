const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const middleware = require('../app/middleware/authenticate');


router.get('/dashboard',middleware.adminAuth,siteController.godash)
router.use('/about', siteController.about)
//router.get('/:token', middleware, siteController.index1)
router.get('/logout',siteController.logout)
router.get('/',middleware.userAuth, siteController.index1)

module.exports = router;