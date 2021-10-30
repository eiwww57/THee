const productRouter = require('./products');
const siteRouter = require('./site');
const adminRouter = require('./admin');
const userRouter = require('./user');
function route(app){
    app.use('/products', productRouter);

    app.use( "/admin", adminRouter);

    app.use('/user', userRouter);

    app.use('/', siteRouter);



//     app.get( "/signin", 
//         (req, res) => {

//                     res.writeHead(200);
//                     res.end("<h1> Signin page ! </h1>");

//     });


//     app.get( "/logout", 
//         (req, res) => {

//                     res.writeHead(200);
//                     res.end("<h1> logout page ! </h1>");

//     });

}

module.exports = route;