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
	env = process.env.NODE_ENV || 'development',
	io = require('socket.io').listen(server),
	users = [],
	connections = [];

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
//resave update session avoid it from expires
app.use(session({
	secret: "asdkoasdkascmkascpoascmkalscasoi",
	resave: true,
	saveUninitialized: true,
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	cookie: {
		maxAge: 6000
	}
}));

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');


//require route for app
var indexRoute = require('./app/routes/client/index.server.routes'),
	apiRoute = require('./app/routes/client/api.server.routes');

//set route for specific request
app.get('/partials/:partialPath', function(req, res) {
	res.render('partials/client/' + req.params.partialPath);
});
app.use('/directives', express.static(path.join(__dirname, 'app/views/directives/client')));
app.use('/api', apiRoute);
app.get('*', indexRoute);


if(env === 'development') {
	// TODO
}
if(env === 'production') {
	// TODO
}

io.sockets.on('connection', function(socket) {
	console.log('Connected: %s sockets connected', connections.length);

	//disconnect
	socket.on('disconnect', function(data) {
		users.splice(users.indexOf(socket.username), 1);
		updateUsername();
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected: %s sockets disconnected', connections.length);
	});

	socket.on('send message', function(data) {
		io.sockets.emit('new message', { username: data.username, message: data.message });
	});

	socket.on('new user', function(data) {
		if(data !== null) {
			socket.username = data;
			users.push(socket.username);
			updateUsername();
		}
	});

	function updateUsername() {
		io.sockets.emit('get users', users);
	}
});


server.listen(port, function() {
	console.log("Web server listening on port " + port);
});
