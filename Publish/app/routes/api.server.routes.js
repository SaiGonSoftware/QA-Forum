/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-18 20:05:10
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-26 00:10:11
 */
var express = require('express');
var router = express.Router();
var api = require('../controllers/api.server.controller');
router.get('/GetAllQuestion', api.QuestionIndex);
router.get('/GetQuestionDetail/:id', api.QuestionDetail);

//api for mobile
router.get('/mobile/GetAllQuestion/', api.QuestionIndexMobile);
module.exports = router;