/**
 * Created by ngohungphuc on 01/04/2017.
 */
var config = require('../../config/secret');
var compose = require('composable-middleware');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var validateJwt = expressJwt({secret: config.secret_token});
var User = require('../models/client/user.server.model');

/*
 *  Middleware to authenticate user
 *  Check the token is pass along in header per request
 */
function IsAuthenticated() {
    return compose().use(function (req, res, next) {
        if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
    }).use(function (req, res, next) {
        User.checkAccountExists(req.username, function (err, user) {
            if (err) return next(err);
            if (!user) return res.send(401);
            req.user = user;
            next();
        });
    });
}

/*
 *Return jwt token signed by the app secrect
 */
function SignToken(id) {
    return jwt.sign({_id: id}, config.secret_token, {expiresIn: 3600});
}

/*
 * Set token directly in server
 */
function SetTokenCookie(req, res) {
    if (!req.user) return res.json(404, {message: 'Something went wrong, please try again.'});
    var token = SignToken(req.user._id);
    res.cookie('token', JSON.stringify(token));
    res.redirect('/');
}

module.exports = {
    IsAuthenticated: IsAuthenticated,
    SignToken: SignToken,
    SetTokenCookie: SetTokenCookie
}