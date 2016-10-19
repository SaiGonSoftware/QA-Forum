/*
* @Author: Ngo Hung Phuc
* @Date:   2016-10-19 20:24:42
* @Last Modified by:   Ngo Hung Phuc
* @Last Modified time: 2016-10-19 23:05:49
*/

var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');
router.get('/',function(req,res,next){
	res.render('account/login',{title:'Đăng Nhập'});
});

router.post('/login/signin',function(req,res,next){
	passport.authenticate('local',{
		failureRedirect:'/'
	},function(req,res){
		res.redirect('/index');
	});
	console.log(req.body);
	//set user to session
	req.login(req.body,function(){
		res.redirect('/index');
	});
});

module.exports = router;