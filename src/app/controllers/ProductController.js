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

    
}

module.exports = new ProductController;