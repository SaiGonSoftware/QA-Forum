/*
 * @Author: hoangphucvu
 * @Date:   2016-10-20 13:55:32
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-11 21:10:35
 */

var User = require('../models/user.server.model');
exports.Index = function(req, res) {
    /*if (!req.session.user) {
    	res.redirect('/');
    } else {
    	res.render('site/index', { title: 'Trang Chủ' });
    }*/
    res.render('site/index', {
        title: 'HỆ THỐNG TƯ VẤN TRỰC TUYẾN'
    });
};

exports.Partial = function(req, res) {
    var name = req.params.name;
    console.log(name);
    res.render('partials/' + name);
};

exports.All = function(req, res) {
    res.render('site/index', {
        title: 'HỆ THỐNG TƯ VẤN TRỰC TUYẾN'
    });
};