const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    StaffID: { type: String, default: null, require:true },
    Staffname: { type: String, default: null,require:true },
    isbill: { type: Boolean, default: true, require:true },
    totalprice:{type: Number, default: 0, require: true},
    products: {type: Array, default: null, require: true}
},  {timestamps: true});
module.exports = mongoose.model('Cart', cartSchema);