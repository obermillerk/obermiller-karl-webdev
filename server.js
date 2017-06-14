var app = require('./express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.sessoin());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

require ("./test/app.js");
require ("./assignment/app.js");
require ("./project/app.js");

var port = process.env.PORT || 3000;

app.listen(port);