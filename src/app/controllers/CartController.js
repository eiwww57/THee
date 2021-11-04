const Cart = require('../schema/cart');
const Product = require('../schema/product');

class CartController {
    addcart(req, res){
        var cart = JSON.parse(req.body.cartinfo);
        var cartval = cart.value;
        var cart1 = [];    
        var sum = 0
        cartval.forEach(e => {
            var cart2 = {};
            cart2.ProID = e[0];
            cart2.ProName = e[1][0];
            cart2.Price = Number(e[1][1]);
            cart2.Quantity = e[1][2];
            cart1.push(cart2);
            sum = sum + (parseInt(e[1][1])*e[1][2]);
        });
        let cartdetail = new Cart ({
            StaffID: req.session.userID,
            Staffname: req.session.userName,
            isbill: false,
            totalprice: sum,
            products: cart1
        });
        cartdetail.save()
        .then(c => {
            res.redirect('/cart');
        })
        .catch(error => {
            console.log(error);
        });
    }
    bill (req, res){
        req.session.userID;
        req.session.userName;
        Cart.findOne({isbill:false}).lean()
        .then(data=>{
            res.render('bill', {data})
        })
    }
    async bill_export (req, res) {
        var billID = req.query.id;
        var cart = await Cart.findOneAndUpdate({_id: billID}, {
            isbill: true
        });
        Array.prototype.forEach.call(cart.products, (product) => {
            Product.findOne({'ProID': product.ProID}).lean().
            exec( (err, docs) => {
                if (err){
                    console.log("\n ERR: ", err);
                }
                else {
                    var new_quantity = parseInt(docs.numofpro) - parseInt(product.Quantity);
                    Product.findOneAndUpdate({'ProID': product.ProID}, {
                        numofpro: String(new_quantity)
                    }).lean().
                    exec((err, final) => {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            console.log(final);
                        }
                    });
                }
            })
        });
        setTimeout(() => {
            res.redirect('/products');
        },2000);
    }
}
module.exports = new CartController;