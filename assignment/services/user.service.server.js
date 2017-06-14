var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.post('/api/user', createUser);
app.post('/api/login', passport.authenticate('local'), login);
app.post('/api/logout', logout);
app.post('/api/register', register)
app.put('/api/user/:userId', updateUser);
app.get('/api/user/:userId', findUserById);
app.get('/api/user', findUserByCredentials);
app.delete('/api/user/:userId', deleteUser);

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(new LocalStrategy(localStrategy));

function localStrategy(username, password, done) {
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
        })

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
