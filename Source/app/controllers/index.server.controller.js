/*
* @Author: hoangphucvu
* @Date:   2016-10-20 13:55:32
* @Last Modified by:   Ngo Hung Phuc
* @Last Modified time: 2016-11-05 22:43:33
*/

var User = require('../models/user.server.model');
exports.Index = function(req,res){
	/*if (!req.session.user) {
		res.redirect('/');
	} else {
		res.render('site/index', { title: 'Trang Chủ' });
	}*/
	res.render('site/index', { title: 'Trang Chủ' });
};

exports.Detail = function(req,res){
	res.render('site/details', { title: 'Thông Tin' });
};

exports.Login = function(req,res){
	res.render('account/login', { title: 'Đăng Nhập' });
};
