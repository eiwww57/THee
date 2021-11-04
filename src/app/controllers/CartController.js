const Cart = require('../schema/cart');

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
            cart2.Price = e[1][1];
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
            res.redirect('products');
        })
        .catch(error => {
            console.log(error);
        });
    }
    bill (req, res){
        req.session.userID;
        req.session.userName;
        Cart.find({isbill:false}).lean()
        .then(data=>{
            res.render('bill', {data})
        })
    }
}
module.exports = new CartController;