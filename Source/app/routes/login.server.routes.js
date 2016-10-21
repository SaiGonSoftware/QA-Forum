/*
* @Author: Ngo Hung Phuc
* @Date:   2016-10-19 20:24:42
* @Last Modified by:   hoangphucvu
* @Last Modified time: 2016-10-21 08:14:48
*/

var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login.server.controller');

router.get('/',loginController.Index);
router.post('/login/signIn',loginController.Login);
router.get('/logout',loginController.Logout);

module.exports = router;