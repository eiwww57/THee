const productRouter = require('./products');
const siteRouter = require('./site');
const adminRouter = require('./admin');
const userRouter = require('./user');
const cartRouter = require('./cart');

function route(app){
    app.use('/products', productRouter);

    app.use( "/admin", adminRouter);

    app.use('/user', userRouter);

    app.use('/cart', cartRouter);

    app.use('/', siteRouter);

}

module.exports = route;