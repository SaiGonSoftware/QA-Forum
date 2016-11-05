var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require('./config/db');
var app = express();
var port = process.env.PORT || 3000;

//require route for app
var loginRoute = require('./app/routes/login.server.routes');
var indexRoute = require('./app/routes/index.server.routes');

//app.locals.pretty = true;
// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:"asdkoasdkascmkascpoascmkalscasoi",resave:false,saveUninitialized:true}));

//set route for specific request
//app.use('/', loginRoute);
app.use('/', indexRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('layout/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('layout/error', {
    message: err.message,
    error: {}
  });
});


app.listen(port,function(req,res){
  console.log('Listen on port ' + port);
});

