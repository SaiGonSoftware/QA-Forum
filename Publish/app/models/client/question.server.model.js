/*
 * @Author: hoangphucvu
 * @Date:   2016-11-18 14:41:15
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-26 01:24:52
 */

var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
var questionSchema = new mongoose.Schema({
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
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
    References: {
        type: Array,
        default: []
    },
    CreateDate: {
        type: Date,
        require: true
    }
});

var Question = mongoose.model('questions', questionSchema);

var countQuestion = function (option, callback) {
    Question.count(option, callback);
};
var getQuestionPaginate = function (limitItemOnePage, currentPage, callback) {
    var numberOfSkipItem = limitItemOnePage * (currentPage - 1);
    Question.find().limit(limitItemOnePage).skip(numberOfSkipItem).sort({'CreateDate': 'descending'}).exec(callback);
};
var getQuestionDetail = function (id, callback) {
    Question.findById(id).populate('QuestionId').exec(callback);
};
//api for mobile
var questionMobileIndex = function (callback) {
    Question.find({}).sort({'CreateDate': -1}).exec(callback);
};
var getQuestion = function (limitItem, callback) {
    Question.find().limit(limitItem).sort({'CreateDate': 'descending'}).exec(callback);
};
var getQuestionViaCategory = function (id, limitItem, callback) {
    Question.find({"CategoryId": ObjectId(id)}).limit(limitItem).exec(callback);
};

var submitQuestion = function (question, callback) {
    Question.collection.insert(question, callback);
};
var findQuestion = function (findString, callback) {
    //var regex = new RegExp('[ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ]+', '');
    Question.find({
        "Title": {
            $regex: findString,
            $options: 'is'
        }
    }).limit(5).sort({'CreateDate': 'descending'}).exec(callback);
    // Question.find({"Title": regex}).limit(5).sort({'CreateDate': 'descending'}).exec(callback);
};

var countTotalQuestionViaCategory = function (categoryId, callback) {
    //db.orders.find( { ord_dt: { $gt: new Date('01/01/2012') } } ).count()
    Question.find({CategoryId: ObjectId(categoryId)}).count(callback);
};

module.exports = {
    Question: Question,
    countQuestion: countQuestion,
    getQuestionPaginate: getQuestionPaginate,
    getQuestionDetail: getQuestionDetail,
    questionMobileIndex: questionMobileIndex,
    getQuestion: getQuestion,
    getQuestionViaCategory: getQuestionViaCategory,
    submitQuestion: submitQuestion,
    findQuestion: findQuestion,
    countTotalQuestionViaCategory: countTotalQuestionViaCategory
};