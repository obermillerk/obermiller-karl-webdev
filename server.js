var ex = require('./express');

var express = ex.express;
var assignmentApp = ex.assignmentApp;
var projectApp = ex.projectApp;

var assignmentRouter = ex.assignmentRouter;
var projectRouter = ex.projectRouter;

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var bodyParser = require('body-parser');
assignmentApp.use(bodyParser.json());
projectApp.use(bodyParser.json());
assignmentApp.use(bodyParser.urlencoded({ extended: true }));
projectApp.use(bodyParser.urlencoded({ extended: true }));

var passEx = require('./passport');
var assignmentPassport = passEx.assignment;
var projectPassport = passEx.project;

assignmentApp.use('/assignment*', assignmentPassport.initialize());
assignmentApp.use('/assignment*', assignmentPassport.session());

projectApp.use(projectPassport.initialize());
projectApp.use(projectPassport.session());

// configure a public directory to host static content
assignmentApp.use(express.static(__dirname + '/public'));

require ("./test/app.js");
require ("./assignment/app.js");
require ("./project/app.js");

projectApp.use(projectRouter);
assignmentApp.use('/assignment/', assignmentRouter);
assignmentApp.use('/project/', projectApp);

var port = process.env.PORT || 3000;

assignmentApp.listen(port);