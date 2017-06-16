var app = require('../../express').assignmentRouter;
var userModel = require('../models/user/user.model.server');
var passport = require('../../passport').assignment;

/* API DEFINITION */

app.post('/api/user', createUser);
app.post('/api/login', passport.authenticate('assignment-local'), login);
app.post('/api/logout', logout);
app.post('/api/register', register);
app.put('/api/user/:userId', updateUser);
app.get('/api/user/:userId', findUserById);
app.get('/api/user', findUserByCredentials);
app.get('/api/loggedin', loggedin);
app.delete('/api/user/:userId', deleteUser);


function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function register(req, res) {
    var user = req.body;

    userModel.createUser(user)
        .then(function(user) {
            if (user) {
                req.login(user, function(err) {
                    if(err)
                        res.sendStatus(400);
                    else
                        res.json(user);
                })
            } else {
                res.sendStatus(400);
            }
        });

}


function createUser(req, res) {
    var user = req.body;

    userModel
        .createUser(user)
        .then(function(user) {
            res.status(201);
            res.json(user);
        }, function() {
            res.sendStatus(409);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function(user) {
            if (user === null)
                res.sendStatus(404);
            else
                res.json(user);
        });
}

function findUserByCredentials(req, res) {
    var password = req.query['password'];

    if (typeof password === 'undefined')
        return findUserByUsername(req, res);

    var username = req.query['username'];

    userModel
        .findUserByCredentials(username, password)
        .then(function(user) {
            if (user === null)
                res.sendStatus(404);
            else
                res.json(user);
        });
}

function findUserByUsername(req, res) {
    var username = req.query['username'];

    userModel
        .findUserByUsername(username)
        .then(function(user) {
            if (user === null)
                res.sendStatus(404);
            else
                res.json(user)
        });
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function updateUser(req, res) {
    var user = req.body;
    var userId = user._id;

    userModel
        .updateUser(userId, user)
        .then(function(response) {
            if (response.n === 1)
                res.sendStatus(200);
            else
                res.sendStatus(404);
        });
}

function deleteUser(req, res) {
    var userId = req.params['userId'];

    userModel
        .deleteUser(userId)
        .then(function(response) {
            if (response.result.n === 1)
                res.sendStatus(200);
            else
                res.sendStatus(404);
        });
}
