/*
* @Author: hoangphucvu
* @Date:   2016-10-20 13:55:32
* @Last Modified by:   hoangphucvu
* @Last Modified time: 2016-10-20 14:11:53
*/

var User = require('../models/user.server.model');
exports.Index = function(req,res){
	if (!req.session.user) {
		res.redirect('/');
	} else {
		res.render('site/index', { title: 'Trang Chủ' });
	}
};
