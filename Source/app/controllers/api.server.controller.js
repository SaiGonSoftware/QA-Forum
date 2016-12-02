/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-18 20:06:26
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-27 22:25:54
 */

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user.server.model');
var Question = require('../models/question.server.model');
var Answer = require('../models/answer.server.model');


exports.QuestionIndex = function (req, res) {
    var limitItemOnePage = 10;
    var currentPage = req.params.pageRequest  | 1;
    console.log("From server " + currentPage  );
    //pagination
    Question.count({}, function (err, totalItem) {
        var numberOfPage = Math.ceil(totalItem / limitItemOnePage);
        var data = Question.find({}).sort({
            'CreateDate': 'descending'
        }).skip(limitItemOnePage * (currentPage - 1)).limit(limitItemOnePage);
        data.exec(function (err, questions) {
            if (err) {
                res.json({
                    msg: err
                });
            }
            else {
                res.json({
                    questions: questions,
                    pages: numberOfPage
                });
            }
        });
    });
};

exports.QuestionDetail = function (req, res) {
    var id = req.params.id;
    Question.findById(id).populate('QuestionId').exec(function (err, questionDetail) {
        if (err) {
            res.json({
                found: false,
                msg: "Not Found"
            });
        } else {
            Answer.find({
                "QuestionId": {
                    "$in": id
                }
            }, function (err, answers) {
                if (err) {
                    res.json({
                        success: false,
                        msg: "Error"
                    });
                } else {
                    res.json({
                        found: true,
                        msg: "Found",
                        questionDetail: questionDetail,
                        answers: answers
                    });
                }
            });
        }
    });
};

//Api for mobile
exports.QuestionIndexMobile = function (req, res) {
    var query = Question.find({}).sort({
        'CreateDate': -1
    });
    query.exec(function (err, questions) {
        if (err)
            return res.status(500).send();
        else
            res.send(questions);
    });
};

exports.Import = function(req,res){
    var hash = bcrypt.hashSync("abc123");
    data = [
        { 'username' : 'nhatnguyen95' ,'password':hash,'level':1}
    ];
    User.collection.insert(data,function(err,result){
        console.log(err);
        console.log(result);
    });
};

exports.Login = function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var hash = bcrypt.hashSync(password);
    console.log(username);
    console.log(hash);
    User.findOne({username:username},function(err,user){
        bcrypt.compare(password, hash, function(err, result) {
            if(err){
                console.log(err);
                return res.status(500).send();
            }
            if(!user){
                console.log(err);
                return res.status(404).send();
            }
            req.session.user = user;
            return res.redirect('/index');
        });
    });
};


exports.Logout = function(req,res){
    req.session.destroy();
    return res.redirect('/');
};