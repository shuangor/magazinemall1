const mongoose = require('mongoose');
const db = require('./connect.js');
 
var goods = mongoose.Schema({
    productId: String,
    productName: String,
    salePrice: Number,
    productNum: Number,
    productImage: String,
    productMessage: String,
    evaluate: Array
});
 
module.exports = mongoose.model('good', goods, 'goods');