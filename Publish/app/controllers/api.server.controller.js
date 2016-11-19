/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-18 20:06:26
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-19 22:46:18
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