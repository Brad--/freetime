'use strict';
var http = require('http');
var path = require('path');
var express  = require('express');
var session  = require('express-session');
var passport = require('passport');
var routes = require('./app/routes/routes.js');

var app = express();
var server = http.createServer(app);

var pg = require('pg');
var client = new pg.Client();

require('dotenv').load();
require('./app/config/passport')(passport);

app.use(express.static(path.resolve(__dirname, 'app')));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(session({
	secret: 'super duper',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session())

// Setup express routes
routes(app, passport);

var port = "3000"
server.listen(port, () => {
	console.log("Server listening on port ", port);
});