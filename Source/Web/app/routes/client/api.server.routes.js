/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-18 20:05:10
 * @Last Modified by:   hoangphucvu
 * @Last Modified time: 2017-03-02 11:10:21
 */
var express = require('express');
var router = express.Router();
var api = require('../../controllers/client/api.server.controller');

router.get('/GetQuestion/', api.GetQuestion);
router.get('/GetNextQuestion/:requestTime', api.GetNextQuestion);
router.get('/GetQuestionDetail/:id', api.QuestionDetail);
router.get('/GetCategory', api.Category);
router.get('/GetCategoryInfo', api.GetCategoryInfo);
router.get('/GetQuestionViaCategory/:id', api.QuestionViaCategory);
router.get('/GetNextQuestionViaCategory/:id/requestTime=:requestTime', api.GetNextQuestionViaCategory);
router.get('/Search/:queryString', api.FindQuestion);
router.get('/AutoComplete/:searchString', api.AutoComplete);
router.get('/Account/Contrib/:currentUser', api.GetAllContrib);
router.get('/GetHotTopic', api.GetHotTopic);
router.get('/GetUnAnswerQuestion', api.GetUnAnswerQuestion);
router.get('/Account/GetMessage', api.GetAllMessages);
router.get('/SearchMobile/:queryString',api.FindQuestionMobile);

router.post('/Account/Register', api.Register);
router.post('/Account/Login', api.Login);
router.post('/Account/PostAnswer/:id', api.Answer);
router.post('/Account/PostQuestion', api.Question);
router.post('/Account/LikeAnswer', api.Like);
router.post('/Account/SaveMessage', api.SaveMessage);
router.post('/Account/DislikeAnswer', api.Dislike);
router.post('/Account/UploadAvatar/:user',api.UploadAvatar);
router.post('/Question/FindQuestion', api.FindQuestion);
//router.post('/Answer/UnLike', api.UnLike);
//router.post('/Answer/UnDislike', api.UnDislike);
//router.post('/Answer/RemoveAnswer', api.RemoveAnswer);
//router.post('/Answer/EditAnswer/:id', api.EditAnswer);

module.exports = router;
