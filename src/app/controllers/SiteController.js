const User = require('../schema/user');
class SiteController {
    //[GET] /products
    index(req, res){
        res.render('login');
    }

    index1(req, res){
        User.findOne({_id: req.session.userID['name']}).lean()
        .then(data=>{
            res.render('home', {data})
        });   
    }

    about(req, res){
        res.render('About');
    }
}

module.exports = new SiteController;