/*
* @Author: Ngo Hung Phuc
* @Date:   2016-10-19 22:38:27
* @Last Modified by:   Ngo Hung Phuc
* @Last Modified time: 2016-10-19 23:08:11
*/
var passport = require('passport');


module.exports = function(app){
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function(user,done){
		done(null,user);
	});

	passport.deserializeUser(function(user,done){
		done(null,user);
	});
};