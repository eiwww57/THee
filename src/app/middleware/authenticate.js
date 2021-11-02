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

const authenticate = (req, res, next) => {
    if (req.session.isAuth == true){
        next();
    }
    else {
        try{

            const token = req.query.token.split(' ')[1];
            const decode = jwt.verify(token, 'SecretValue');
            
            req.session.isAuth = true;
            req.session.userID = decode;
            next();

        }
        catch(error){
            res.redirect('/user/login');
        }
    }
}

module.exports = authenticate;