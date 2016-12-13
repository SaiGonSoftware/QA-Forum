/**
 * Created by ngohungphuc on 12/12/2016.
 */
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.server.model');

passport.serializeUser(function (user, done) {
    return done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('registerUser', new LocalStrategy(
    {passReqToCallback: true},
    function (req, username, password, done) {
        var newUser = new User({
            Account: req.body.UsernameRegis,
            Password: req.body.PasswordRegis,
            Email: req.body.EmailRegis,
            Level:2
        });

        newUser.save(function (err) {
            if (err) return done(err);
            return done(null, newUser);
        });
    }));

passport.use('loginStrategy',new LocalStrategy(function (username,password,done) {
    console.log("in 2");
    User.findOne({username: username}, function (err, doc) {
        if (err) {
            return done(err);
        }

        if (!doc) {
            return done(null, false, {message: 'Incorrect username.'});
        }

        doc.validPassword(password, doc.password, function (err, isMatch) {
            if (err) {
                return  done(err);
            }

            if (!isMatch) {
                return done(null, false, { msg: 'Incorrect' });
            }

            return done(null, doc, { msg: 'success' });
        });
    });
}));