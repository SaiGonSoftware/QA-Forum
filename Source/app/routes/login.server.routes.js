/*
* @Author: Ngo Hung Phuc
* @Date:   2016-10-19 20:24:42
* @Last Modified by:   Ngo Hung Phuc
* @Last Modified time: 2016-10-29 21:34:20
*/

var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login.server.controller');

router.get('/',loginController.Index);
router.post('/login/signIn',loginController.Login);
router.get('/logout',loginController.Logout);
router.get('/import',loginController.Import);
module.exports = router;