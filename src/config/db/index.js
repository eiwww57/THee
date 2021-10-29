const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect("mongodb+srv://teeheeadmin:01011994@cluster0.bjskh.mongodb.net/TeeHee?retryWrites=true&w=majority",{
            useNewUrlParser:true, 
            useUnifiedTopology:true
        });
        console.log("Connect Successfully");

    } catch (error) {
        console.log("Connect Unsuccessfully");
    }
}

module.exports = {connect};