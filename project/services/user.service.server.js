var app = require('../../express').projectRouter;
var userModel = require('../models/user/user.model.server');
var passport = require('../../passport').project;
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use('project-local', new LocalStrategy(projectStrategy));


function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(function(user) {
                done(null, user);
            },
            function(err) {
                done(err, null);
            });
}

function projectStrategy(username, password, done) {
    userModel
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


/* API DEFINITION */

app.post('/rest/login', passport.authenticate('project-local'), login);
app.post('/rest/logout', logout);
app.post('/rest/register', register);
app.post('/rest/unregister', unregister);
app.post('/rest/follow', followUser);
app.post('/rest/unfollow', unfollowUser);

app.get('/rest/user/:username', findUserByUsername);
app.get('/rest/loggedin', loggedin);
app.get('/rest/follow/:username', isCurrentUserFollowing);
app.get('/rest/self/:username', isUserSelf);




function login(req, res) {
    var user = req.body;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function register(req, res) {
    var user = req.body;
    userModel.createUser(user)
        .then(function(user) {
            if (user)
                req.login(user, function(err) {
                    if(err)
                        res.sendStatus(400);
                    else
                        res.json(user);
                });
            else
                res.sendStatus(400);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        });
}

function unregister(req, res) {
    var user = req.body;
    userModel.unregister(user._id)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(404);
        });
}

function followUser(req, res) {
    var follower = req.user;

    if (typeof follower === 'undefined') {
        res.send('Not logged in');
        return;
    }

    var user = req.body;

    userModel.followUser(follower._id, user._id)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        })
}

function findUserByUsername(req, res) {
    var username = req.params['username'];

    userModel.findUserByUsername(username)
        .then(function(user) {
            if (user === null)
                res.sendStatus(404);
            else
                res.json(user);
        })
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function isCurrentUserFollowing(req, res) {
    var username = req.params['username'];
    var follower = req.user;

    if (typeof follower === 'undefined') {
        res.json(false);
        return;
    }

    userModel.findUserByUsername(username)
        .then(function(user) {
            if (user === null) {
                res.status(404).end('Could not find user');
            } else {
                return userModel.isUserFollowing(follower, user);
            }
        })
        .then(function(response) {
            res.json(response);
        })
}

function isUserSelf(req, res) {
    var username = req.params['username'];
    var self = req.user;

    if (typeof self === 'undefined') {
        res.json(false);
        return;
    }

    userModel.findUserByUsername(username)
        .then(function(user) {
            if (user === null) {
                res.status(404).end('Could not find user');
            } else {
                var ans = String(self._id) === String(user._id);
                res.json(ans);
            }
        });
}

function unfollowUser(req, res) {
    var follower = req.user;

    if (typeof follower === 'undefined') {
        res.send('Not logged in');
        return;
    }

    var user = req.body;

    userModel.unfollowUser(follower._id, user._id)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        })
}