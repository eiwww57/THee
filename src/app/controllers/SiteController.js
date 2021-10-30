class SiteController {
    //[GET] /products
    index(req, res){
        res.send('home');
    }

    about(req, res){
        res.render('About');
    }
}

module.exports = new SiteController;