/*
* @Author: hoangphucvu
* @Date:   2016-10-20 13:19:53
* @Last Modified by:   Ngo Hung Phuc
* @Last Modified time: 2016-11-05 22:10:26
*/
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user.server.model');
exports.Index = function(req,res){
	res.render('account/login',{title:'Đăng Nhập'});
};

exports.Import = function(req,res){
	var hash = bcrypt.hashSync("070695");
	data = [
	{ 'username' : 'phucngo' ,'password':hash,'level':1}
	];
	User.collection.insert(data,function(err,result){
		console.log(err);
		console.log(result);
	});
};

exports.Login = function(req,res){
	var username = req.body.userName;
	var password = req.body.passWord;
	var hash = bcrypt.hashSync(password);
	console.log(username);
	console.log(hash);
	User.findOne({username:username},function(err,user){
		bcrypt.compare(password, hash, function(err, result) {
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
	});
};


exports.Logout = function(req,res){
	req.session.destroy();
	return res.redirect('/');
};