/*
* @Author: hoangphucvu
* @Date:   2016-10-20 13:19:53
* @Last Modified by:   hoangphucvu
* @Last Modified time: 2016-10-20 13:50:15
*/

var User = require('../models/user.server.model');
exports.Index = function(req,res){
	res.render('account/login',{title:'Đăng Nhập'});
};

exports.Login = function(req,res){
	var username = req.body.userName;
	var password = req.body.passWord;
	User.findOne({username:username},function(err,user){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		if(!user){
			console.log(err);
			return res.status(404).send();
		}
		return res.status(200).send();
	});
};