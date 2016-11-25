/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-18 20:06:26
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-26 00:25:34
 */

var Question = require('../models/question.server.model');

exports.QuestionIndex = function(req, res) {
    var query = Question.find({}).sort({
        'CreateDate': -1
    }).limit(6);
    query.exec(function(err, questions) {
        if (err)
            return res.status(500).send();
        else
            res.send(questions);
    });
};

exports.QuestionDetail = function(req, res) {
    var id = req.params.id;
    console.log(id);
    Question.findById(id, function(err, questionDetail) {
        console.log(err);
        if (err)
            return res.status(500).send();
        else
            res.send(questionDetail);
    });
};