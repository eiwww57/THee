const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, default: null, require:true },
    password: { type: String, default: null,require:true },
    name: { type: String, default: null,require:true },
    email: { type: String, default: null, maxLength: 200,require:true },
    phone: { type: String, default: null, maxLength: 15,require:true },
    NaID: { type: Number, default: 0,require:true },
    DOB:{type: Date, default: null, require: true},
    admin: {type: Boolean, default: false}
},  {timestamps: true});
module.exports = mongoose.model('User', userSchema);