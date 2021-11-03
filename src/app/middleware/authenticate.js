const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const session = require('express-session');
const MongoStore = require('connect-mongo');

router.use(session({
    secret: 'mySecretKey',
    resave: true,
    saveUninitialized: false
}));

const adminAuth = (req, res, next) => {
    if ((req.session.isAuth == true) && (req.session.admin == true)){
        next();
    }
    else if ((req.session.isAuth == true) && (req.session.admin == false)) {
        res.send('You are not an administrator. Know your place!!(つ﹏<。)')
    }
    else {
        try{

            const token = req.query.token.split(' ')[1];
            const decode = jwt.verify(token, 'SecretValue');
            
            req.session.isAuth = true;
            req.session.userID = decode['name'];
            req.session.admin = decode['admin'];
            next();

        }
        catch(error){
            res.redirect('/user/login');
        }
    }
}
const userAuth = (req, res, next) => {
    if (req.session.isAuth == true){
        next();
    }
    else {
        try{

            const token = req.query.token.split(' ')[1];
            const decode = jwt.verify(token, 'SecretValue');
            req.session.isAuth = true;
            req.session.userID = decode['name'];
            req.session.admin = decode['admin'];
            next();

        }
        catch(error){
            res.redirect('/user/login');
        }
    }
}

module.exports = {adminAuth, userAuth};