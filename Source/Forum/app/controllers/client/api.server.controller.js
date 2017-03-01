/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-18 20:06:26
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2017-03-01 23:03:55
 */

var User = require("../../models/client/user.server.model");
var Question = require("../../models/client/question.server.model");
var Answer = require("../../models/client/answer.server.model");
var Category = require("../../models/client/categories.server.model");
var Message = require("../../models/client/message.server.model");
var CONSTANT = require("../../helpers/constant.helper.server");
var ObjectId = require("mongodb").ObjectId;
var google = require("google");
var async = require("async");
var net = require("net");
var config = require("../../../config/secret");
var jwt = require("jsonwebtoken");
//index page
exports.GetQuestion = function(req, res) {
	var limitItem = CONSTANT.LIMIT_ITEM;
	Question.getQuestion(limitItem, function(err, questions) {
		if(err)
			return res.json({ msg: err });
		return res.json({ questions: questions });
	});
};
exports.GetNextQuestion = function(req, res) {
	var limitItem = CONSTANT.LIMIT_ITEM;
	if(req.params.requestTime !== null) {
		limitItem *= req.params.requestTime;
	}
	Question.getQuestion(limitItem, function(err, questions) {
		if(err)
			return res.json({ msg: err });
		return res.json({ questions: questions });
	});
};
exports.QuestionDetail = function(req, res) {
	var id = req.params.id;
	if(id !== null) {
		async.waterfall([
			function(callback) {
				Question.getQuestionDetail(id, function(err, questionDetail) {
					//pass questionDetail data to next function and so on
					callback(null, questionDetail);
				});
			},
			function(questionDetail, callback) {
				Question.updateViewTime(id, function(err, data) {
					callback(null, questionDetail);
				});
			},
			function(questionDetail, callback) {
				Answer.getAnswerViaQuestion(id, function(err, answers) {
					callback(null, questionDetail, answers);
				});
			}
		], function(err, questionDetail, answers) {
			// this is when we complete excute async db query
			if(err) {
				return res.json({
					msg: err
				});
			} else {
				return res.json({
					found: true,
					msg: "Found",
					questionDetail: questionDetail,
					answers: answers
				});
			}
		});
	}
};
exports.Question = function(req, res) {
	var refArray = [];
	var resultArray = [];
	google.resultsPerPage = CONSTANT.SEARCH_RESULT;
	var searchForRef = new Promise(function(resolve, reject) {
		if(req.body.Title) {
			google(req.body.Title + CONSTANT.SEARCH_STRING, function(err, res) {
				if(err)
					console.error(err);
				for(var i = 0; i < res.links.length; i++) {
					var link = res.links[i];
					refArray = {
						"Title": link.title,
						"Link": link.href
					};
					if(refArray.Title && refArray.Link) {
						resultArray.push(refArray);
						resolve(refArray);
					}
				}
			});
		}
	});
	searchForRef.then(function() {
		var newQuestion = [{
			"CategoryId": ObjectId(req.body.CategoryId),
			"UserQuestion": req.body.UserQuestion,
			"Content": req.body.Content,
			"Title": req.body.Title,
			"References": resultArray,
			"CreateDate": new Date(),
			"ViewTime": 0
		}];
		Question.submitQuestion(newQuestion, function(err, newInsertQuestion) {
			var questionInsertId = newInsertQuestion.ops[0]._id;
			if(err)
				return res.json({ success: false, msg: "Có lỗi xảy ra vui lòng thử lại" });
			return res.json({
				success: true,
				url: "/bai-viet/" + questionInsertId,
				msg: "Đăng câu hỏi thành công"
			});
		});
	});
};
exports.Answer = function(req, res) {
	var newAnswer = [{
		"UserAnswer": req.body.UserAnswer,
		"QuestionId": ObjectId(req.params.id),
		"Content": req.body.Content,
		"CreateDate": new Date(),
		"References": req.body.References,
		"Like": [],
		"Dislike": []
	}];
	Answer.submitAnswer(newAnswer, function(err, answer) {
		if(err) {
			res.json({ success: false, msg: "Có lỗi xảy ra vui lòng thử lại" });
		}
		res.json({ success: true, msg: "Đăng câu trả lời thành công" });
	});
};
exports.Like = function(req, res) {
	var username = req.body.UserLike;
	var answerId = req.body.AnswerId;
	if(username !== null && answerId !== null) {
		Answer.checkLikeExists(answerId, username, function(err, exists) {
			if(exists.length > CONSTANT.EXIST_ITEM) {
				async.waterfall([
					function(callback) {
						Answer.unLike(answerId, username, function(err, result) {
							callback(null, answerId);
						});
					},
					function(answerId, callback) {
						Answer.getAnswerViaId(answerId, function(err, total) {
							callback(null, total);
						});
					}
				], function(err, total) {
					if(err) {
						return res.json({ err: err });
					} else {
						return res.json({
							success: true,
							checkLikeAndDislike: true,
							totalLike: total.Like.length,
							totalDislike: total.Dislike.length
						});
					}
				});
			} else {
				async.waterfall([
					function(callback) {
						Answer.addLike(answerId, username, function(err, like) {
							callback(null, answerId);
						});
					},
					function(answerId, callback) {
						Answer.countLike(answerId, function(err, total) {
							callback(null, total);
						});
					}
				], function(err, total) {
					if(err) {
						return res.json({ err: err });
					} else {
						return res.json({
							success: true,
							alreadyLike: false,
							totalLike: total.Like.length,
							msg: "Đã thích câu trả lời"
						});
					}
				});
			}
		});
	}
};
exports.Dislike = function(req, res) {
	var username = req.body.UserDislike;
	var answerId = req.body.AnswerId;
	if(username !== null && answerId !== null) {
		Answer.checkDislikeExists(answerId, username, function(err, exists) {
			if(exists.length > CONSTANT.EXIST_ITEM) {
				async.waterfall([
					function(callback) {
						Answer.unDislike(answerId, username, function(err, result) {
							callback(null, answerId);
						});
					},
					function(answerId, callback) {
						Answer.getAnswerViaId(answerId, function(err, total) {
							callback(null, total);
						});
					}
				], function(err, total) {
					if(err) {
						return res.json({ err: err });
					} else {
						return res.json({
							success: true,
							checkLikeAndDislike: true,
							totalLike: total.Like.length,
							totalDislike: total.Dislike.length
						});
					}
				});
			} else {
				async.waterfall([
					function(callback) {
						Answer.addDislike(answerId, username, function(err, dislike) {
							callback(null, answerId);
						});
					},
					function(answerId, callback) {
						Answer.countDislike(answerId, function(err, total) {
							callback(null, total);
						});
					}
				], function(err, total) {
					if(err) {
						return res.json({ err: err });
					} else {
						return res.json({
							success: true,
							alreadyDislike: false,
							totalDislike: total.Dislike.length,
							msg: "Đã dislike câu trả lời"
						});
					}
				});
			}
		});
	}
};
//account relative
exports.Register = function(req, res) {
	var usernameRegis = req.body.UsernameRegis;
	var emailRegis = req.body.EmailRegis;
	var passwordRegis = req.body.PasswordRegis;
	if(usernameRegis !== null && emailRegis !== null && passwordRegis !== null) {
		User.checkAccountExists(usernameRegis, function(err, account) {
			User.checkEmailExists(emailRegis, function(err, email) {
				if(err)
					return res.json({ err: err });
				if(account && email) {
					return res.json({ foundBoth: true });
				}
				if(account && !email) {
					return res.json({ foundAccount: true });
				}
				if(email && !account) {
					return res.json({ foundEmail: true });
				}
				if(!account && !email) {
					var hashPassword = User.generateHash(passwordRegis);
					var newUser = [{
						"Account": usernameRegis,
						"Password": hashPassword,
						"Email": emailRegis,
						"Level": CONSTANT.DEFAULT_LEVEL,
						"Avatar": null
					}];
					User.createUser(newUser, function(err) {
						if(err)
							return res.json({ err: err });
						return res.json({ success: true, url: "/" });
					});
				}
			});
		});
	} else {
		res.json({ msg: "Error" });
	}
};
exports.Login = function(req, res) {
	var username = req.body.UsernameLogin;
	var password = req.body.PasswordLogin;
	var socialAccount = req.body.SocialAccount;
	if(username !== undefined && password !== undefined) {
		async.waterfall([
			function(callback) {
				User.checkAccountExists(username, function(err, user) {
					if(user == null) {
						res.json({ login: false });
						return;
					} else
						callback(null, user);
				});
			},
			function(user, callback) {
				var authUser = User.validPassword(password, user.Password);
				if(!authUser) {
					res.json({ login: false });
				} else callback(null, user);
			},
			function(user, callback) {
				var userSession = user.Account;
				var token = jwt.sign({
					user
				}, "superscrettoken", { expiresIn: '1h' });

				console.log(token);
				callback(null, userSession);
			}
		], function(err, userSession) {
			if(err)
				return res.json({ err: err });
			return res.json({ login: true, url: "/", userSession: userSession });
		});
	}
	if(socialAccount !== undefined) {
		var facebookUser = [{
			"Account": req.body.SocialAccount,
			"SocialId": req.body.SocialId,
			"Level": CONSTANT.DEFAULT_LEVEL,
			"Avatar": null
		}];

		async.waterfall([
			function(callback) {
				User.checkSocialAccountExists(req.body.SocialId, function(err, account) {
					if(account === null)
						callback(null, facebookUser);
					else
						return res.json({ success: true, url: "/" });

				});
			},
			function(facebookUser, callback) {
				User.createUser(facebookUser, function(err) {
					if(err)
						return res.json({ err: err });

					callback(null, true);
				});
			}
		], function(err, result) {
			return res.json({ success: true, url: "/" });
		});
	}
};
exports.GetAllContrib = function(req, res) {
	var currentUser = req.params.currentUser;
	async.waterfall([
		function(callback) {
			Question.getAllContrib(currentUser, function(err, user_contrib) {
				callback(null, user_contrib, currentUser);
			});
		},
		function(user_contrib, currentUser, callback) {
			User.getUserInfo(currentUser, function(err, userInfo) {
				callback(null, user_contrib, userInfo);
			});
		}
	], function(err, user_contrib, userInfo) {
		if(err)
			return res.json({ err: err });
		return res.json({ user_contrib: user_contrib, userInfo: userInfo });
	});
};
//category relative
exports.Category = function(req, res) {
	Category.getCategories(function(err, categories) {
		if(err)
			return res.status(500).send();
		return res.send(categories);
	});
};
exports.GetCategoryInfo = function(req, res) {
	var listCount = [];
	var indexCount = 0;
	async.waterfall([
		function(callback) {
			Category.getCategories(function(err, categories) {

				callback(null, categories);
			});
		},
		function(categories, callback) {
			categories.forEach(function(category) {
				Question.countTotalQuestionViaCategory(category._id, function(err, total) {
					listCount.push(total);
					if(indexCount == categories.length - 1) {
						callback(null, listCount, categories);
					}
					indexCount++;
				});
			});
		}
	], function(err, listCount, categories) {
		if(err)
			return res.json({ err: err });
		return res.json({ postCount: listCount, categories: categories });
	});
};
exports.QuestionViaCategory = function(req, res) {
	var id = req.params.id;
	var limitItem = CONSTANT.LIMIT_ITEM;
	Question.getQuestionViaCategory(id, limitItem, function(err, questions) {
		if(err)
			return res.json({ id: id, found: false, msg: "Not Found" });
		return res.json({ found: true, msg: "Found", questions: questions });
	});
};
exports.GetNextQuestionViaCategory = function(req, res) {
	var limitItem = CONSTANT.LIMIT_ITEM;
	var categoryId = req.params.id;
	if(req.body.requestTime !== null) {
		limitItem *= req.params.requestTime;
	}
	Question.getQuestionViaCategory(categoryId, limitItem, function(err, questions) {
		if(err)
			return res.json({ msg: err });
		return res.json({ questions: questions });
	});
};
exports.FindQuestion = function(req, res) {
	var queryString = req.params.queryString;
	var questionsResult = [];
	var indexCount = 0;
	var client = net.connect(2345, "localhost");
	client.write(queryString);
	client.on("data", function(data) {
		outputString = data.toString("utf8");
		var stringSplitArray = outputString.split(",");
		stringSplitArray.forEach(function(id, index) {
			Question.findQuestionById(id, function(err, questions) {
				questionsResult.push(questions);
				if(indexCount == stringSplitArray.length - 1) {
					return res.json({ questions: questionsResult });
				}
				indexCount++;
			});
		});
		client.destroy();
	});
	client.end();
};
exports.GetHotTopic = function(req, res) {
	Question.getHotTopic(function(err, hotToipics) {
		if(err)
			return res.json({ msg: err });
		return res.json({ hotToipics: hotToipics });
	});
};
exports.GetUnAnswerQuestion = function(req, res) {
	async.waterfall([
		function(callback) {
			Answer.getDistinctId(function(err, idArray) {
				callback(null, idArray);
			});
		},
		function(idArray, callback) {
			Question.getUnAnswerQuestion(idArray, function(err, unAnswerQuestions) {
				callback(null, unAnswerQuestions);
			});
		}
	], function(err, unAnswerQuestions) {
		if(err)
			return res.json({ msg: err });
		return res.json({ unAnswerQuestions: unAnswerQuestions });
	});
};
//chat sections
exports.GetAllMessages = function(req, res) {
	Message.getMessage(function(err, result) {
		if(err)
			return res.json({ err: err });
		return res.json({ success: true, result: result });
	});
};
exports.SaveMessage = function(req, res) {
	var message = [{
		"User": req.body.username,
		"Message": req.body.message,
		"SentDate": req.body.currentTime,
		"CreateDate": new Date()
	}];
	Message.saveMessage(message, function(err, result) {
		if(err)
			return res.json({ err: err });
		return res.json({ success: true, result: result });
	});
}
exports.AutoComplete = function(req, res) {
	var searchString = req.params.searchString;
	Question.getRelatedQuestion(searchString, function(err, result) {
		console.log(result);
		return res.json({ autoCompleteResults: result });
	});
}


/*exports.UnLike = function(req, res) {
	var username = req.body.UserLike;
	var answerId = req.body.AnswerId;
	Answer.unLike(answerId, username, function(err) {
		if(err)
			res.json({ success: false, msg: "Error" });
		res.json({ success: true, msg: "UnLike success" });
	});
};
exports.UnDislike = function(req, res) {
	var username = req.body.UserLike;
	var answerId = req.body.AnswerId;
	Answer.unDislike(answerId, username, function(err) {
		if(err)
			res.json({ success: false, msg: "Error" });
		res.json({ success: true, msg: "UnDislike success" });
	});
};
exports.RemoveAnswer = function(req, res) {
	var answerId = req.body.answerId;
	Answer.removeAnswer(answerId, function(err) {
		if(err)
			res.json({ success: false, msg: "Error" });
		res.json({ success: true, msg: "Remove answer success" });
	});
};
exports.EditAnswer = function(req, res) {
	var answerId = req.params.id;
	var answerContent = req.body.answerContent;
	Answer.editAnswer(answerId, answerContent, function(err) {
		if(err)
			return res.json({ success: false, msg: "Error" });
		return res.json({ success: true, msg: "Update answer success" });
	});
};*/
/*exports.QuestionIndex = function (req, res) {
 var limitItemOnePage = 10;
 var currentPage = req.params.pageRequest || 1;
 //pagination
 Question.countQuestion({}, function (err, totalItem) {
 var numberOfPage = Math.ceil(totalItem / limitItemOnePage);
 Question.getQuestionPaginate(limitItemOnePage, currentPage,
 function (err, questions) {
 if (err) res.json({msg: err});
 else res.json({questions: questions, pages: numberOfPage});
 });
 });
 };*/