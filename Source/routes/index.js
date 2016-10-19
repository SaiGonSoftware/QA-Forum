var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var users = [
    {
        username:'phucngo',
        password:'070695',
        level:1
    }
];
/* GET home page. */
router.all(function(req,res,next){
    if(!req.user){
        req.redirect('/');
    }
    next();
}).get('/',function(req, res, next) {
  res.render('site/index', { title: 'Trang Chủ' });
});

router.get('/insert', function(req, res, next) {
    var url = 'mongodb://localhost:27017/ChatBot';
    mongodb.connect(url,function (err,db) {
        var collection =  db.collection('users');
        collection.insert(users,function (err,result) {
            res.send(result);
            db.close();
        });
    });
});

module.exports = router;
