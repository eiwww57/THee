const Product = require('../schema/product');

class ProductController {
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

            return res.redirect('./admin')
            // var data ={
            //     "ProID": id,
            //     "ProName":name,
            //     "Price": price,
            //     "numofpro": quantity,
            //     "Description": des,
            //     "imglink": image,
                
            // }
            // //insert into mongodb
            // db.collection('Products').insertOne(data, function(err,collection){
            //     if (err) throw err;
            //     console.log("added"); 
                
            // });
            // //return to admin page           
    }
}

module.exports = new ProductController;