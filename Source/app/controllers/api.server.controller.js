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
    var hash1 = bcrypt.hashSync("070695");
    data = [
        { 'Account' : 'nhatnguyen95' ,'Password':hash,'FullName':'Ngô Hùng Phúc',"CreateDate":"2016-12-02",'level':1},
        { 'Account' : 'phucngo95' ,'Password':hash1,'FullName':'Nguyễn Nhật Nguyên',"CreateDate":"2016-12-02",'level':1}
    ];
    User.collection.insertMany(data,function(err,result){
        console.log(err);
        console.log(result);
    });
};

exports.Login = function(req,res){
    var username = req.body.username;
    var passwordToHash = req.body.password;
    console.log(username);

    var hash = bcrypt.hashSync(passwordToHash);
    console.log(hash);
    User.findOne({username:username,password:hash},function(err,user){
            console.log(user);
            if(err){
                return res.json({
                    status:500,
                    msg: "Có lỗi xảy ra vui lòng thử lại"
                });
            }
            if(!user){
                console.log(err);
                return res.json({
                    status:404,
                    msg: "Vui lòng kiểm tra tên đăng nhập và mật khẩu"
                });
            }
            req.session.user = user;
            return res.json({
                msg: "Đăng nhập thành công",
                url:'/',
                user:user
            });
    });
};


exports.Logout = function(req,res){
    req.session.destroy();
    return res.redirect('/');
};