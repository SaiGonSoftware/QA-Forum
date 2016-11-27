/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-18 20:06:26
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-27 22:25:54
 */

var Question = require('../models/question.server.model');
var Answer = require('../models/answer.server.model');
var User = require('../models/user.server.model');
exports.QuestionIndex = function(req, res) {
    var query = Question.find({}).sort({
        'CreateDate': 'descending'
    }).limit(6);
    var count = Question.count();
    count.exec(function(e, count) {
        console.log('count', count); // can be more than 2, this is not calculated, mongo stores this value internally
    });
    query.exec(function(err, questions) {
        if (err)
            return res.status(500).send();
        else
            res.send(questions);
    });
};

exports.QuestionDetail = function(req, res) {
    var id = req.params.id;
    Question.findById(id).populate('QuestionId').exec(function(err, questionDetail) {
        if (err) {
            res.json({
                success: false,
                msg: "Error"
            });
        } else {
            Answer.find({
                "QuestionId": {
                    "$in": id
                }
            }, function(err, answers) {
                if (err) {
                    res.json({
                        success: false,
                        msg: "Error"
                    });
                } else {
                    res.json({
                        success: true,
                        msg: "Success",
                        questionDetail: questionDetail,
                        answers: answers
                    });
                }
            });
        }
    });
};