/*
 * @Author: hoangphucvu
 * @Date:   2016-10-20 11:08:23
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-19 15:35:32
 */

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var userSchema = new mongoose.Schema({
    local:{
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
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});
var User = mongoose.model('users', userSchema);
// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
//check password valid or not
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password,this.local.Password);
};

module.exports = User;