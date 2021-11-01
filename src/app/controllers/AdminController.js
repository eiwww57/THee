const Product = require('../schema/product');

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
        
        req.body.imglink = "imgs/" + req.body.imglink
        Product.updateOne({_id:req.params.id}, req.body)
        .then(data=>{
            res.redirect('/admin/viewproducts');
        })
    }

    editImg(req,res){
        
        Product.findOne({_id:req.params.id}, req.body).lean()
        .then(data=>{
            res.render('imgedit',{data})
        })
    }

    updateImg(req,res){
        req.body.imglink = "imgs/" + req.file.filename;
        Product.updateOne({_id:req.params.id},req.body).lean()
        .then(data=>{
            res.redirect('/admin/viewproducts')
        })
    }
}

module.exports = new AdminController;