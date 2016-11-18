/*
 * @Author: hoangphucvu
 * @Date:   2016-11-18 14:41:15
 * @Last Modified by:   hoangphucvu
 * @Last Modified time: 2016-11-18 14:49:04
 */

var mongoose = require('mongoose');
var QuestionSchema = new mongoose.Schema({
    UserQuestion: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Content: {
        type: String,
        required: true
    },
    CreateDate: {
        type: Date,
        default: Date.Now,
        required: true
    },
    Answers: {
        type: Array,
        default: [],
        required: true
    }

});

var Question = mongoose.model('question', QuestionSchema);

module.exports = Question;