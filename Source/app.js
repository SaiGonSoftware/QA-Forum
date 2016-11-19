var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    db = require('./config/db'),
    app = express(),
    port = process.env.PORT || 3000,
    http = require('http'),
    server = http.createServer(app),
    env = process.env.NODE_ENV || 'development';

//require route for app
var loginRoute = require('./app/routes/login.server.routes'),
    indexRoute = require('./app/routes/index.server.routes'),
    apiRoute = require('./app/routes/api.server.routes');
//app.locals.pretty = true;
// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: "asdkoasdkascmkascpoascmkalscasoi",
    resave: false,
    saveUninitialized: true
}));


//set route for specific request
app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.use('/api', apiRoute);
app.get('*', indexRoute);


// Config reload whenever frontend folder change
if (env === 'development') {
    // TODO
}

if (env === 'production') {
    // TODO
}
console.log(env);
server.listen(port, function() {
    console.log("Web server listening on port " + port);
});