/*
 * @Author: hoangphucvu
 * @Date:   2016-10-20 11:08:23
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-19 15:35:32
 */

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var userSchema = new mongoose.Schema({
        Account: {
            type: String,
            unique: true,
            require: true
        },
        Password: {
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

var checkAccountExists = function (username,callback) {
    User.findOne({'Account':username},callback);
};
var checkEmailExists = function (email,callback) {
    User.findOne({'Email':email},callback);
};
// generating a hash
var generateHash = function (password) {
  return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
//check password valid or not
var validPassword = function (password) {
    return bcrypt.compareSync(password,this.local.Password);
};

var createUser = function (user,callback) {
  User.collection.insert(user,callback);
};

module.exports = {
    User:User,
    checkAccountExists:checkAccountExists,
    checkEmailExists:checkEmailExists,
    generateHash:generateHash,
    createUser:createUser
};