class SiteController {
    //[GET] /products
    index(req, res){
        res.send('home');
    }

    about(req, res){
        res.render('about');
    }
}

module.exports = new SiteController;