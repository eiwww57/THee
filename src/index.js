const http = require("http");
var fs = require("fs");
var path = require("path");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { urlencoded } = require("express");
const { stringify } = require("querystring");
const mongoose = require('mongoose');
const multer = require('multer');
const handlebars = require('express-handlebars');
//database connection
const db = require('./config/db');
app.use(bodyParser.urlencoded({extended:true}));
db.connect();


// const proedit = require('../schema/product');


const methodOverride = require('method-override');
const exp = require("constants");
app.use(methodOverride('_method'));


//view engine setup 
app.engine('hbs', handlebars({
    defaultLayout:'main',
    extname: '.hbs',
    
}));
app.set("views", path.join(__dirname, "resources/views")); //setting views directory for views. 
app.set("view engine", "hbs"); //setting view engine as handlebars 

/// PUBLIC FILEs
app.use(express.static('public'))


/// Khai bao cac Config, Params
const hostname = "localhost";
const port = process.env.PORT || 3000;

/// Khai bao Variables
var solan = 0;

///Router
const route = require('./routes');
const router = require("./routes/products");

/// REQ chung 
app.use(
    (req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type","text/html");
        console.log("--- ", Date.now(), " \t request !!!", solan++ , req.url);
        next();
    }
);



/// Error-Handling
app.use(
    (err, req, res, next) => {
        res.statusCode = 500;
        console.log("--- ERR", Date.now(), " \t request !!!", solan++ , req.url, err);
        res.end("Broking !!!");
    }
);

route(app);


/// Open Server - Listen PORT
app.listen( port, () => {
    console.log("Start SERVER - LISTEN ", port);
});
