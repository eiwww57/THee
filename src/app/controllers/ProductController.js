const Product = require('../schema/product');

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
}

module.exports = new ProductController;