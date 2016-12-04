/*
 * @Author: hoangphucvu
 * @Date:   2016-10-20 11:08:23
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-19 15:35:32
 */

var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    Account: {
        type: String,
        unique: true,
        require: true
    },
    PassWord: {
        type: String,
        require: true
    },
    Email:{
        type:String,
        require:true
    },
    Level: {
        type: Number,
        require: true
    }
});
var User = mongoose.model('users', userSchema);

module.exports.getUserByUserName = function(username,callback){
    var qyery = {Account:username};
    User.findOne(query,callback);
};

module.exports.comparePassword = function(password,callback){
    var qyery = {Account:username};
    User.findOne(query,callback);
};

module.exports = User;