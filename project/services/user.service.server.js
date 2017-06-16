var app = require('../../express').projectRouter;
var userModel = require('../models/user/user.model.server');
var passport = require('../../passport').project;

/* API DEFINITION */

app.post('/rest/login', passport.authenticate('project-local'), login);
app.post('/rest/logout', logout);
app.post('/rest/register', register);
app.post('/rest/unregister', unregister);

app.put('/rest/follow', followUser);

app.get('/rest/user/:username', findUserByUsername);
app.get('/rest/loggedin', loggedin);

app.delete('/rest/follow', unfollowUser);



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
    userModel.deleteUser(user)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(404);
        });
}

function followUser(req, res) {
    var follower = req.body.follower;
    var user = req.body.user;

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

function unfollowUser(req, res) {
    var follower = req.body.follower;
    var user = req.body.user;

    userModel.unfollowUser(follower._id, user._id)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        })
}