/*
 * @Author: hoangphucvu
 * @Date:   2016-10-20 13:55:32
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-18 20:05:58
 */

var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index.server.controller');

router.get('*', indexController.All);

module.exports = router;