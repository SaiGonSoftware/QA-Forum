/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-18 20:06:26
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-18 21:17:46
 */

var Question = require('../models/question.server.model');

exports.QuestionIndex = function(req, res) {
    var questions = Question.find({}).sort({
        'CreateDate': -1
    }).limit(10);
    res.send(questions);
};