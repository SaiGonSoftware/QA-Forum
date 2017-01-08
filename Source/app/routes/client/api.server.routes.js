/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-18 20:05:10
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-26 00:10:11
 */
var express = require('express');
var router = express.Router();
var api = require('../../controllers/client/api.server.controller');

router.get('/GetQuestion/', api.GetQuestion);
router.get('/GetNextQuestion/:requestTime', api.GetNextQuestion);
router.get('/GetQuestionDetail/:id', api.QuestionDetail);
router.get('/GetCategory', api.Category);
router.get('/GetQuestionViaCategory/:id', api.QuestionViaCategory);

router.post('/Account/Register', api.Register);
router.post('/Account/Login', api.Login);
router.post('/Account/PostAnswer/:id', api.Answer);
router.post('/Account/PostQuestion', api.Question);
router.post('/Account/LikeAnswer', api.Like);
router.post('/Answer/UnLike', api.UnLike);
router.post('/Account/DislikeAnswer', api.Dislike);
router.post('/Answer/UnDislike', api.UnDislike);
router.post('/Question/FindQuestion', api.FindQuestion);
router.post('/Answer/RemoveAnswer', api.RemoveAnswer);
router.post('/Answer/EditAnswer/:id', api.EditAnswer);
module.exports = router;