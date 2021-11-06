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




router.post('/updatestaff/:id',middleware.adminAuth, adminController.updateStaff)
router.get('/stafflevel/:id', adminController.adminAuthen); //admin true/false
router.get('/staff/staffdetail/:id', adminController.staffDetail);
router.get('/staff', adminController.vieweStaff)
router.get('/sale/billdetail/:id', adminController.billDetail)
router.get('/sale', adminController.viewBill);
router.get('/viewproducts',middleware.adminAuth, adminController.viewProducts);
router.post('/addproducts', upload.single('imglink'), adminController.addProducts);
router.get('/deleteproducts', adminController.deleteProducts);
router.get('/edit/:id', adminController.editProducts);
router.post('/update/:id',upload.single('imglink') ,adminController.updateProduct);
router.get('/', middleware.adminAuth, adminController.index);

module.exports = router;
