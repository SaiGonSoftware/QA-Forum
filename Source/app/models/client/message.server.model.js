var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
var messageSchema = new mongoose.Schema({
	User: {
		type: String,
		require: true
	},
	Message: {
		type: String,
		require: true
	},
	SentDate: {
		type: String,
		require: true
	},
	CreateDate: {
		type: String,
		require: true
	}
});

var Message = mongoose.model('messages', messageSchema);

var saveMessage = function(message, callback) {
	Message.collection.insert(message, callback);
};

var getMessage = function(callback) {
	Message.find({}).exec(callback);
}
module.exports = {
	Message: Message,
	saveMessage: saveMessage,
	getMessage: getMessage
};
