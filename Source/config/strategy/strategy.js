/*
* @Author: Ngo Hung Phuc
* @Date:   2016-10-19 22:49:24
* @Last Modified by:   Ngo Hung Phuc
* @Last Modified time: 2016-10-19 23:14:35
*/

var passport = require('passport'),
localStragegy = require('passport-local').Stragegy,
mongodb = require('mongodb').MongoClient;

module.exports = function(){
	passport.use(new localStragegy({
		usernameField:'username',
		passwordField:'password'
	},function(username,password,done){
		var url = 'mongodb://localhost:27017/ChatBot';
		mongodb.connect(url,function (err,db) {
			var collection =  db.collection('users');
			collection.findOne({username:username},function(err,result){
				if(result.password === password){
					var user = result;
					done(null,user);
				}
				else{
					done(null,false,{message:'Wrong password'});
				}
			});
		});
		var user = {
			username:username,
			password:password
		};
		done(null,user);
	}));
};
