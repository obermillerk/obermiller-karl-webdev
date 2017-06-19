var passport = require('passport');

var projectPassport = new passport.Passport();
var assignmentPassport = new passport.Passport();

var instances = {
    project: projectPassport,
    assignment: assignmentPassport
};

module.exports = instances;