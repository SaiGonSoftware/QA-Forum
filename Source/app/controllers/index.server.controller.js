/*
* @Author: hoangphucvu
* @Date:   2016-10-20 13:55:32
* @Last Modified by:   hoangphucvu
* @Last Modified time: 2016-11-07 09:03:07
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

exports.Partial = function (req, res) {
  var name = req.params.name;
  console.log(name);
  res.render('partials/view1');
};

exports.Detail = function(req,res){
	res.render('site/details', { title: 'Thông Tin' });
};

exports.Login = function(req,res){
	res.render('account/login', { title: 'Đăng Nhập' });
};
