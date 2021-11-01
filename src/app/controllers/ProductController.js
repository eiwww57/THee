const Product = require('../schema/product');
var db = require('../../config/db');
class ProductController {
    //[GET] /products
    index(req, res){
        Product.find().lean().
            exec( (err, docs) => {
            if (err){
                console.log("\n ERR: ", err);
                process.exit(0);
            }
            else {
                console.log(docs);
                res.render("products", { products : docs });
            }
        });
    }
    productDetails(req, res){
        Product.findOne({ProID: req.params.id}, req.body).lean()
        .then(data=>{
            res.render('product_detail', {data})
        });

    }

    searchProduct(req,res,next){
        const input = req.query.ProName;
        let regex = new RegExp(input,'i');
        Product.find({"ProName": regex}).lean()
        .then(data=>{
            res.render('products', {products:data});
        })
    }
    
}

module.exports = new ProductController;