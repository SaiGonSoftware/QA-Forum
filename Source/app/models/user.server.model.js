/*
* @Author: hoangphucvu
* @Date:   2016-10-20 11:08:23
* @Last Modified by:   hoangphucvu
* @Last Modified time: 2016-10-21 15:13:53
*/

var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	username:{type:String,unique:true},
	password:{type:String},
	level:{type: Number}
});

var User = mongoose.model('users',userSchema);

module.exports = User;