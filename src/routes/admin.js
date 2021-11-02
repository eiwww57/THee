const express = require('express');
const router = express.Router();
const multer = require('multer');

//define disk
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'public/imgs');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload = multer({
    storage:storage
});

const adminController = require('../app/controllers/AdminController');
const middleware = require('../app/middleware/authenticate');


//Method put
const methodOverride = require('method-override');
const exp = require("constants");


router.get('/viewproducts', adminController.viewProducts);
router.post('/addproducts', upload.single('imglink'), adminController.addProducts);
router.get('/deleteproducts', adminController.deleteProducts);
router.get('/edit/:id', adminController.editProducts);
router.put('/update/:id',upload.single('imglink') ,adminController.updateProduct);
router.get('/:token', middleware, adminController.index);
router.get('/', middleware, adminController.index);

module.exports = router;
