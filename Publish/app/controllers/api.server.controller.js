/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-18 20:06:26
 * @Last Modified by:   hoangphucvu
 * @Last Modified time: 2016-12-29 15:31:52
 */

var User = require('../models/user.server.model');
var Question = require('../models/question.server.model');
var Answer = require('../models/answer.server.model');
var Category = require('../models/categories.server.model');
var ObjectId = require('mongodb').ObjectId;
var google = require('google');
var async = require('async');
exports.GetQuestion = function (req, res) {
    var limitItem = 10;
    Question.getQuestion(limitItem, function (err, questions) {
        if (err) res.json({
            msg: err
        });
        else res.json({
            questions: questions
        });
    });
};
exports.GetNextQuestion = function (req, res) {
    var limitItem = 10;
    if (req.params.requestTime !== null) {
        limitItem *= req.params.requestTime;
    }
    Question.getQuestion(limitItem, function (err, questions) {
        if (err) res.json({
            msg: err
        });
        else res.json({
            questions: questions
        });
    });
};
/*exports.QuestionIndex = function (req, res) {
 var limitItemOnePage = 10;
 var currentPage = req.params.pageRequest || 1;
 //pagination
 Question.countQuestion({}, function (err, totalItem) {
 var numberOfPage = Math.ceil(totalItem / limitItemOnePage);
 Question.getQuestionPaginate(limitItemOnePage, currentPage,
 function (err, questions) {
 if (err) res.json({msg: err});
 else res.json({questions: questions, pages: numberOfPage});
 });
 });
 };*/
exports.QuestionDetail = function (req, res) {
    var id = req.params.id;
    if (id !== null) {
        Question.getQuestionDetail(id, function (err, questionDetail) {
            if (err) {
                res.json({
                    found: false,
                    msg: "Not Found"
                });
            }
            else {
                Answer.getAnswerViaQuestion(id, function (err, answers) {
                    if (err) res.json({
                        success: false,
                        msg: "Error"
                    });
                    else {
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
    }
};
exports.Register = function (req, res) {
    var usernameRegis = req.body.UsernameRegis;
    var emailRegis = req.body.EmailRegis;
    var passwordRegis = req.body.PasswordRegis;
    if (usernameRegis !== null && emailRegis !== null && passwordRegis !== null) {
        User.checkAccountExists(usernameRegis, function (err, account) {
            User.checkEmailExists(emailRegis, function (err, email) {
                if (err) throw err;
                if (account !== null && email !== null) {
                    res.json({
                        foundBoth: true
                    });
                }
                if (account !== null) {
                    if (email === null) res.json({
                        foundAccount: true
                    });
                }
                if (email !== null) {
                    if (account === null) res.json({
                        foundEmail: true
                    });
                } else {
                    var hashPassword = User.generateHash(passwordRegis);
                    var newUser = [{
                        'Account': usernameRegis,
                        'Password': hashPassword,
                        'Email': emailRegis,
                        'Level': 2
                    }];

                    User.createUser(newUser, function (err) {
                        if (err) throw err;
                        res.json({
                            success: true,
                            url: '/'
                        });
                    });
                }
            });
        });
    }
    else {
        res.json({msg: "Error"});
    }
};
exports.Login = function (req, res) {
    var username = req.body.UsernameLogin;
    var password = req.body.PasswordLogin;
    if (username !== null && password !== null) {
        User.checkAccountExists(username, function (err, user) {
            if (user === null) {
                res.json({
                    login: false
                });
            }
            var AuthUser = User.validPassword(password, user.Password);
            if (!AuthUser) {
                res.json({
                    login: false
                });
            } else {
                var userSession = user.Account;
                req.session.user = user;
                res.json({
                    login: true,
                    url: '/',
                    userSession: userSession
                });
            }
        });
    }
    else {
        res.json({login: false});
    }
};
exports.Answer = function (req, res) {
    var newAnswer = [{
        'UserAnswer': req.body.UserAnswer,
        'QuestionId': ObjectId(req.params.id),
        'Content': req.body.Content,
        'CreateDate': new Date(),
        'references': req.body.references,
        'like': [],
        'dislike': []
    }];

    Answer.submitAnswer(newAnswer, function (err, answer) {
        if (err) {
            res.json({
                success: false,
                msg: "Có lỗi xảy ra vui lòng thử lại"
            });
        }
        res.json({
            success: true,
            msg: "Đăng câu trả lời thành công"
        });
    });
};
exports.Question = function (req, res) {
    var refArray = [];
    var resultArray = [];
    google.resultsPerPage = 4;
    var searchForRef = new Promise(
        function (resolve, reject) {
            if (req.body.Title) {
                google(req.body.Title + ' Đại học tôn đức thắng', function (err, res) {
                    if (err) console.error(err);

                    for (var i = 0; i < res.links.length; i++) {
                        var link = res.links[i];
                        refArray =
                            {
                                'Title': link.title,
                                'Link': link.href
                            };
                        if (refArray.Title && refArray.Link) {
                            resultArray.push(refArray);
                            resolve(refArray);
                        }
                    }
                });
            }
        }
    );
    searchForRef.then(
        function () {
            var newQuestion = [{
                'CategoryId': ObjectId(req.body.CategoryId),
                'UserQuestion': req.body.UserQuestion,
                'Content': req.body.Content,
                'Title': req.body.Title,
                'References': resultArray,
                'CreateDate': new Date()
            }];

            Question.submitQuestion(newQuestion, function (err, newInsertQuestion) {
                var questionInsertId = newInsertQuestion.ops[0]._id;
                if (err) res.json({
                    success: false,
                    msg: "Có lỗi xảy ra vui lòng thử lại"
                });
                res.json({
                    success: true,
                    url: '/bai-viet/' + questionInsertId,
                    msg: "Đăng câu hỏi thành công"
                });
            });
        });
};
exports.Category = function (req, res) {
    Category.getCategories(function (err, categories) {
        if (err)
            return res.status(500).send();
        else
            res.send(categories);
    });
};
exports.QuestionViaCategory = function (req, res) {
    var id = req.params.id;
    Question.getQuestionViaCategory(id, function (err, categories) {
        if (err) res.json({
            id: id,
            found: false,
            msg: "Not Found"
        });
        else {
            res.json({
                found: true,
                msg: "Found",
                categories: categories,

            });
        }
    });
};
exports.Like = function (req, res) {
    var username = req.body.UserLike;
    var answerId = req.body.AnswerId;
    if (username !== null && answerId !== null) {
        Answer.addLike(answerId, username, function (err, like) {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: "Error"
                });
            }

            else {
                if (like.result.nModified === 0) {
                    Answer.countLike(answerId, function (err, total) {
                        console.log(total);
                        res.json({
                            success: true,
                            alreadyLike: true,
                            totalLike: total,
                            msg: "Bạn đã thích câu trả lời này"
                        });
                    });
                }
                else {
                    res.json({
                        success: true,
                        alreadyLike: false,
                        msg: "Đã thích câu trả lời"
                    });
                }
            }
        });
    }
};
exports.UnLike = function (req, res) {
    var username = req.body.UserLike;
    var answerId = req.body.AnswerId;
    console.log(username);

    Answer.unLike(answerId, username, function (err) {
        if (err) res.json({
            success: false,
            msg: "Error"
        });
        res.json({
            success: true,
            msg: "UnLike success"
        });
    });
};
exports.Dislike = function (req, res) {
    var username = req.body.UserLike;
    var answerId = req.body.AnswerId;
    Answer.addDislike(answerId, username, function (err) {
        if (err) res.json({
            success: false,
            msg: "Error"
        });
        res.json({
            success: true,
            msg: "Dislike success"
        });
    });
};
exports.UnDislike = function (req, res) {
    var username = req.body.UserLike;
    var answerId = req.body.AnswerId;
    console.log(username);

    Answer.unDislike(answerId, username, function (err) {
        if (err) res.json({
            success: false,
            msg: "Error"
        });
        res.json({
            success: true,
            msg: "UnDislike success"
        });
    });
};
exports.FindQuestion = function (req, res) {
    var stringFind = req.body.findString;
    console.log(stringFind);

    Question.findQuestion(stringFind, function (err, questions) {
        if (err) res.json({
            msg: err
        });
        else res.json({
            questions: questions
        });
    });
};
exports.RemoveAnswer = function (req, res) {
    var answerId = req.body.answerId;
    console.log(answerId);
    Answer.removeAnswer(answerId, function (err) {
        if (err) res.json({success: false, msg: "Error"});
        res.json({success: true, msg: "Remove answer success"});
    });
};
exports.EditAnswer = function (req, res) {
    var answerId = req.params.id;
    var answerContent = req.body.answerContent;
    Answer.editAnswer(answerId, answerContent, function (err) {
        if (err) res.json({success: false, msg: "Error"});
        res.json({success: true, msg: "Update answer success"});
    });
};