/*
 * @Author: hoangphucvu
 * @Date:   2016-11-18 14:41:15
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-26 01:24:52
 */

var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    UserQuestion: {
        type: String,
        require: true
    },
    Title: {
        type: String,
        require: true
    },
    Content: {
        type: String,
        require: true
    },
    CreateDate: {
        type: Date,
        require: true
    }
});

var Question = mongoose.model('questions', questionSchema);

module.exports = Question;