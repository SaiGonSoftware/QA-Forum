/*
* @Author: Ngo Hung Phuc
* @Date:   2016-10-19 20:24:42
* @Last Modified by:   Ngo Hung Phuc
* @Last Modified time: 2016-10-19 21:53:34
*/

var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;

router.get('/',function(req,res,next){
	res.render('account/login',{title:'Đăng Nhập'});
});

module.exports = router;