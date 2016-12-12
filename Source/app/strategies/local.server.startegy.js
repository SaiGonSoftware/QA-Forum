/**
 * Created by ngohungphuc on 12/12/2016.
 */
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.server.model');

passport.use(new LocalStrategy(function (username,password,done) {
    User.findOne({Account:username},function (err,user) {
       if(err){return done(err);}
       if(!user){
           return done(null,false,{message:"Tên đăng nhập không đúng"});
       }
        if(!user.validPassword(password)){
            return done(null,false,{message:"Mật khẩu không đúng"});
        }
        // If the credentials are valid,
        // the verify callback invokes done to supply Passport with the user that authenticated
        return done(null,user);
    });
}));

passport.serializeUser(function (user,done) {
    done(null,user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});