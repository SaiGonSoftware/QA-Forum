/*
* @Author: hoangphucvu
* @Date:   2016-10-20 13:19:53
* @Last Modified by:   hoangphucvu
* @Last Modified time: 2016-10-20 14:15:18
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
		req.session.user = user;
		return res.redirect('/index');
	});
};

exports.Logout = function(req,res){
	req.session.destroy();
	return res.redirect('/');
};