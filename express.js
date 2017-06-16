const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const assignmentApp = express();
const projectApp = express();


var projectRouter = express.Router();
var assignmentRouter = express.Router();

projectApp.use(cookieParser());
projectApp.use(session({
    secret: process.env.SESSION_SECRET,
    name: 'project',
    cookie: {
        path: '/project/'
    }
}));
assignmentApp.use(cookieParser());
assignmentApp.use(session({
    secret: process.env.SESSION_SECRET,
    name: 'assignment',
    cookie: {
        path: '/assignment/'
    }
}));

var exports = {};
exports.assignmentApp = assignmentApp;
exports.projectApp = projectApp;
exports.projectRouter = projectRouter;
exports.assignmentRouter = assignmentRouter;
exports.express = express;

module.exports = exports;