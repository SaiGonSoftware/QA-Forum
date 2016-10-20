/*
* @Author: Ngo Hung Phuc
* @Date:   2016-10-19 20:24:42
* @Last Modified by:   hoangphucvu
* @Last Modified time: 2016-10-20 13:58:47
*/

var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login.server.controller');

router.get('/',loginController.Index);
router.post('/login/signIn',loginController.Login);

module.exports = router;