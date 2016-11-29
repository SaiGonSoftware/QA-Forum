/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-18 20:06:26
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-27 22:25:54
 */

var Question = require('../models/question.server.model');
var Answer = require('../models/answer.server.model');
var User = require('../models/user.server.model');
exports.QuestionIndex = function (req, res) {
    var limitItemOnePage = 10;
    var currentPage = 1;

    //pagination
    Question.count({}, function (err, totalItem) {
        var numberOfPage = Math.ceil(totalItem / limitItemOnePage);
        var result = Question.find({}).sort({
            'CreateDate': 'descending'
        }).skip(limitItemOnePage * (currentPage - 1)).limit(limitItemOnePage);
    });

    var query = Question.find({}).sort({
        'CreateDate': 'descending'
    }).limit(6);
    query.exec(function (err, questions) {
        if (err)
            return res.status(500).send();
        else
            res.send(questions);
    });
};

exports.QuestionDetail = function (req, res) {
    var id = req.params.id;
    console.log(id);
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