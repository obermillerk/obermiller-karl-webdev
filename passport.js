var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var projUserModel = require('./project/models/user/user.model.server');
var asgnUserModel = require('./assignment/models/user/user.model.server');

var projectPassport = new passport.Passport();
var assignmentPassport = new passport.Passport();

var instances = {
    project: projectPassport,
    assignment: assignmentPassport
};

module.exports = instances;

function serializeUser(user, done) {
    done(null, user);
}


assignmentPassport.serializeUser(serializeUser);
assignmentPassport.deserializeUser(AdeserializeUser);

function AdeserializeUser(user, done) {
    asgnUserModel
        .findUserById(user._id)
        .then(function(user) {
                done(null, user);
            },
            function(err) {
                done(err, null);
            });
}

assignmentPassport.use('assignment-local', new LocalStrategy(assignmentStrategy));

function assignmentStrategy(username, password, done) {
    asgnUserModel
        .findUserByCredentials(username, password)
        .then(function(user) {
                if (user !== null && user.username === username && user.password === password) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err)
                    return done(err);
            });
}


projectPassport.serializeUser(serializeUser);
projectPassport.deserializeUser(PdeserializeUser);

function PdeserializeUser(user, done) {
    projUserModel
        .findUserById(user._id)
        .then(function(user) {
                done(null, user);
            },
            function(err) {
                done(err, null);
            });
}

projectPassport.use('project-local', new LocalStrategy(projectStrategy));

function projectStrategy(username, password, done) {
    projUserModel
        .findUserByCredentials(username, password)
        .then(function(user) {
                if (user !== null && user.username === username && user.password === password) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err)
                    return done(err);
            });
}