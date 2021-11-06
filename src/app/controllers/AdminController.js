const cart = require('../schema/cart');
const Product = require('../schema/product');
const User = require('../schema/user');
class AdminController {
    //[GET] /products
    index(req, res){
        res.render('admin'); 
    }

    viewProducts(req, res){
        Product.find().lean().
            exec( (err, docs) => {
            if (err){
                console.log("\n ERR: ", err);
                process.exit(0);
            }
            else {
                console.log(docs);
                res.render("adminview", { adminview : docs });
            }
        });
    }

    addProducts(req, res) {
            req.body.imglink = "imgs/" + req.file.filename;

            var product = new Product(req.body);
            product.save();

            return res.redirect('/admin')
        
    }
    deleteProducts(req, res){
        //code here
        Product.deleteOne({ "ProID": req.query.id }, function(err) {
        if (!err) {
            return res.redirect('/admin/viewproducts');
        }
        else {
            return res.redirect('/products');
        }}
        );
    }
    editProducts(req, res){
        Product.findOne({_id:req.params.id}, req.body).lean()
        .then(data=>{
            res.render('edit', {data})
        });
    }

    updateProduct(req,res){
        
        if(req.file){
            req.body.imglink = "imgs/" + req.file.filename;
            Product.updateOne({_id:req.params.id},req.body).lean()
            .then(data=>{
                res.redirect('/admin/viewproducts')
            })
        }
        else{
            Product.updateOne({_id:req.params.id},req.body).lean()
            .then(data=>{
                res.redirect('/admin/viewproducts')
            })
        }
    }

    viewBill(req,res){
        cart.find({isbill:true}).lean()
        .then(data=>{
            res.render('sale',{data})
        })
    }

    billDetail(req,res){
        cart.findOne({_id:req.params.id}).lean()
        .then(data=>{
            res.render('billdetail', {data})
        })
    }
   
    

    staffDetail(req,res){
        User.findOne({_id:req.params.id}).lean()
        .then(data=>{
            res.render('hrdetail', {data})
        })
    }

    vieweStaff(req,res){
        User.find().lean()
        .then(data=>{
            res.render('hr', {data})
        })
    }


    adminAuthen(req,res){
       User.updateOne({_id:req.params.id},{admin:true})
        .then(data=>{
            res.redirect('/admin/staff')
        })
    }

    updateStaff(req,res){
        console.log(req.body)
        User.updateOne({_id:req.params.id}, req.body).lean()
        .then(data=>{
            res.redirect('/admin/staff')
        })
    }
   
}

module.exports = new AdminController;