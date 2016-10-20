/*
* @Author: Ngo Hung Phuc
* @Date:   2016-10-19 20:24:42
* @Last Modified by:   hoangphucvu
* @Last Modified time: 2016-10-20 11:41:08
*/

var express = require('express');
var router = express.Router();
var User = require('../models/User');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ChatBot');
router.get('/',function(req,res,next){
	res.render('account/login',{title:'Đăng Nhập'});
});

router.get('/login/profile',function(req,res){
	res.json(req.user);
});

router.post('/login/signIn',function(req,res,next){
	var username = req.body.userName;
	var password = req.body.passWord;
	console.log(req.body.userName);
	console.log(req.body.passWord);
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
});

module.exports = router;