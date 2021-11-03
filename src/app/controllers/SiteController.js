const User = require('../schema/user');
class SiteController {
    //[GET] /products
    index(req, res){
        res.render('login');
    }

    index1(req, res){
        User.findOne({_id: req.session.userID}).lean()
        .then(data=>{
            res.render('home', {data})
        });   
    }

    about(req, res){
        res.render('About');
    }

    logout(req, res){
        req.session.isAuth = false;
        req.session.userID = null;
        req.session.userName = null;
        res.redirect('/user/login');
    }
}

module.exports = new SiteController;