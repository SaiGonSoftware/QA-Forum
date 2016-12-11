/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-18 20:06:26
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-27 22:25:54
 */

var User = require('../models/user.server.model');
var Question = require('../models/question.server.model');
var Answer = require('../models/answer.server.model');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var bcrypt   = require('bcrypt-nodejs');


exports.QuestionIndex = function (req, res) {
    var limitItemOnePage = 10;
    var currentPage = req.params.pageRequest || 1;
    //pagination
    Question.countQuestion({},function (err,totalItem) {
        var numberOfPage = Math.ceil(totalItem / limitItemOnePage);
        Question.getQuestionPaginate(limitItemOnePage,currentPage,
            function (err,questions) {
            console.log(questions);
            if (err) res.json({msg: err});
            else res.json({questions: questions, pages: numberOfPage});
        });
    });
};
exports.QuestionDetail = function (req, res) {
    var id = req.params.id;
    Question.getQuestionDetail(id,function (err,questionDetail) {
        if (err) res.json({found: false, msg: "Not Found"});
        else {
            Answer.getAnswerViaQuestion(id,function (err, answers) {
                if (err) res.json({success: false, msg: "Error"});
                else {
                    res.json({
                        found: true,
                        msg: "Found",
                        questionDetail: questionDetail,
                        answers: answers
                    });
                }
            });
        };
    });
};
exports.Register = function (req, res) {
    var hashPassword = bcrypt.hashSync(req.body.PasswordRegis.Password,bcrypt.genSaltSync(8),null);
    //console.log(hashPassword);
    var newUser = new User({
        Account: req.body.UsernameRegis,
        Password: hashPassword,
        Email: req.body.EmailRegis,
        Level: 2
    });

    User.collection.insert(newUser,function(err,user){
        if(err) throw err;
        console.log(user);
    });
};
exports.Login = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    passport.use(new LocalStartegy(
        function (username, password, done) {
            User.getUserByUsername(username, function (err, user) {
                if (err) throw err;
                if (!user) return done(null, false, {message: 'Không tìm thấy user'});
                User.comparePassword(password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) return done(null, user);
                    return done(null, false, {message: 'Mật khẩu không đúng'});
                });
            });
        }
    ));

    passport.authenticate('local',
        {successRedirect: '/', failureRedirect: '/dang-nhap', failureFlash: true},
        function (req, res) {
            res.redirect('/');
        });
    /*console.log(username);

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
     });*/
};
exports.Logout = function (req, res) {
    req.session.destroy();
    return res.redirect('/');
};

//Api for mobile
exports.QuestionIndexMobile = function (req, res) {
    Question.questionMobileIndex(function (err, questions) {
        if (err)
            return res.status(500).send();
        else
            res.send(questions);
    });
};
