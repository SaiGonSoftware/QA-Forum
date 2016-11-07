/*
* @Author: hoangphucvu
* @Date:   2016-10-20 13:55:32
* @Last Modified by:   hoangphucvu
* @Last Modified time: 2016-11-07 09:02:36
*/

var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index.server.controller');

router.get('/',indexController.Index);
router.get('/partials/:name',indexController.Partial);
router.get('/details',indexController.Detail);
router.get('/dang-nhap',indexController.Login);
/*
router.get('/partials/:name',indexController.Partial);
router.get('/details',indexController.Detail);
router.get('/dang-nhap',indexController.Login);*/

module.exports = router;