/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-19 15:38:22
 * @Last Modified by:   hoangphucvu
 * @Last Modified time: 2016-12-29 15:21:21
 */

var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
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
    References: {
        type: Array,
        default: []
    },
    Like: {
        type: Array,
        default: []
    },
    Dislike: {
        type: Array,
        default: []
    }
});

var Answer = mongoose.model('answers', answerSchema);
var getAnswerViaQuestion = function (id, callback) {
    Answer.find({"QuestionId":id}).sort({
        'CreateDate': 'descending'
    }).exec(callback);
};
var submitAnswer = function (answer, callback) {
    Answer.collection.insert(answer, callback);
};
var addLike = function (answerId, username, callback) {
    Answer.collection.update({
        _id: ObjectId(answerId)
    }, {
        "$addToSet": {
            "Like": username
        }
    }, callback);
};
var countLike = function (answerId, callback) {
    Answer.findById(answerId, callback);
};
var countDislike = function (answerId, callback) {
    Answer.findById(answerId, callback);
};
var unLike = function (answerId, username, callback) {
    Answer.collection.update({
        _id: ObjectId(answerId)
    }, {
        "$pull": {
            "Like": username
        }
    }, callback);
};
var addDislike = function (answerId, username, callback) {
    Answer.collection.update({
        _id: ObjectId(answerId)
    }, {
        "$addToSet": {
            "Dislike": username
        }
    }, callback);
};
var unDislike = function (answerId, username, callback) {
    Answer.collection.update({
        _id: ObjectId(answerId)
    }, {
        "$pull": {
            "Dislike": username
        }
    }, callback);
};
var checkLikeExists = function (answerId, username, callback) {
    Answer.find({
        _id: ObjectId(answerId),
        Like: username
    }, callback);
};
var checkDislikeExists = function (answerId, username, callback) {
    Answer.find({
        _id: ObjectId(answerId),
        Dislike: username
    }, callback);
};
var removeLike = function (answerId, username, callback) {
    Answer.collection.update({
        _id: ObjectId(answerId)
    }, {
        "$pull": {
            Like: username
        }
    }, Answer.collection.update({
        _id: ObjectId(answerId)
    }, {
        "$addToSet": {
            Like: username
        }
    }, callback));
};
var removeDislike = function (answerId, username, callback) {
    Answer.collection.update({
        _id: ObjectId(answerId)
    }, {
        "$pull": {
            Like: username
        }
    }, Answer.collection.update({
        _id: ObjectId(answerId)
    }, {
        "$addToSet": {
            Like: username
        }
    }, callback));
};
var removeAnswer = function (answerId, callback) {
    Answer.collection.remove({
        _id: ObjectId(answerId)
    }, callback);
};
var getAnswerViaId = function (answerId, callback) {
    Answer.findById(answerId, callback);
};
var editAnswer = function (answerId, answerContent, callback) {
    Answer.collection.update({
        _id: ObjectId(answerId)
    }, {
        "$set": {
            "Content": answerContent
        }
    }, callback);
};

var getDistinctId = function (callback) {
    Answer.find({}).distinct('QuestionId', callback);
};

var getUserAnswer = function(questionId,callback){
    Answer.find({QuestionId:questionId},'UserAnswer',callback);
};
module.exports = {
    Answer: Answer,
    getAnswerViaQuestion: getAnswerViaQuestion,
    submitAnswer: submitAnswer,
    addLike: addLike,
    unLike: unLike,
    addDislike: addDislike,
    unDislike: unDislike,
    removeAnswer: removeAnswer,
    editAnswer: editAnswer,
    countLike: countLike,
    countDislike: countDislike,
    checkLikeExists: checkLikeExists,
    checkDislikeExists: checkDislikeExists,
    removeLike: removeLike,
    removeDislike: removeDislike,
    getAnswerViaId: getAnswerViaId,
    getDistinctId: getDistinctId,
    getUserAnswer:getUserAnswer
};
