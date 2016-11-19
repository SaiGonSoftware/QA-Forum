/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-19 15:38:22
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-19 15:47:25
 */

var mongoose = require('mongoose');
var answerSchema = new mongoose.Schema({
    QuestionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    UserAnswer: {
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
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    }
});

var Answer = mongoose.model('answers', answerSchema);

module.exports = Answer;