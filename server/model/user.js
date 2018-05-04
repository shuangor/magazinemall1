const mongoose = require('mongoose');
const db = require('./connect.js');
 
const users = mongoose.Schema({
    username: String,
    password: String,
    myCart: Array,
    address: Array
});
 
module.exports = mongoose.model('user', users, 'users');
