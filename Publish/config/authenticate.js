/**
 * Created by ngohungphuc on 09/12/2016.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user.server.model');

module.exports = function (passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session
    passport.serializeUser(function (user,done) {
        done(null,user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function (user,done) {
        User.findById(id,function (err,user) {
            done(err,user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-signup',new LocalStrategy({
            usernameField:'UsernameRegis',
            passwordField:'PasswordRegis',
            passReqToCallback:true // allows us to pass back the entire request to the callback
        },
        function (req,UsernameRegis,PasswordRegis,done) {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function(){
                // find a user whose account is the same as the forms account
                // we are checking to see if the user trying to login already exists
                User.findOne({'Account':UsernameRegis},function (err,user) {
                    if(err) return done(err);
                    // check to see if theres already a user with that account
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    }
                    else{
                        var newUser = new User();
                        newUser.local.Account = UsernameRegis;
                        newUser.local.Password = newUser.generateHash(PasswordRegis);
                        newUser.save(function (err) {
                            if(err) throw err;
                            return done(null,newUser);
                        });
                    }
                });
            });
        }
    ));
};