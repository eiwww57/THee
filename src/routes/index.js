const productRouter = require('./products');
const siteRouter = require('./site');
const adminRouter = require('./admin');
function route(app){
    app.use('/products', productRouter);

    app.use('/about', siteRouter);

    app.use( "/admin", adminRouter);

    app.use('/', siteRouter);


// //edit
//     app.get('/edit/:id', function(req,res){
//         proedit.findOne({_id:req.params.id}, req.body)
//         .then(data=>{
//             res.render('edit', {data})
//         })
        
//     });


// //update
//     app.put('/update/:id', function(req,res){
//         proedit.updateOne({_id:req.params.id}, req.body)
//         .then(data=>{
//             res.redirect('/adminview')
//         });
//     });


// //new delete
// /*router.get('/deletepro/:ProID',function(req,res){

//     proedit.deleteOne({"ProID":req.params.ProID}, (err,docs) =>{
//         if (err) throw err;
//         else {
//             res.redirect('/adminview')
//         }
//     }) 
// })
// */
// //delete
//     app.get("/deletepro",function(req,res){
//         db.collection("Products").deleteOne({ "ProID": req.query.id }, function(err) {
//             if (!err) {
//                     return res.redirect('adminview')
//             }
//             else {
//                     return res.redirect('products')
//             }
//         });
//     });


//     app.get("/prodetail", function(req,res){
//         db.collection("Products").findOne({"ProID": req.query.id}, async (err, docs) => {
//             if (err){
//                 console.log("\n ERR: ", err);
//                 process.exit(0);
//             }
//             else {
//                 result = await docs;
//                 console.log(result);
//                 res.render("product_detail", { products : result });
//             }
//         });       
//     });

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