var app = require('../../express');
var userModel = require('../models/user/user.model.server');

app.post('/api/user', createUser);
app.put('/api/user/:userId', updateUser);
app.get('/api/user/:userId', findUserById);
app.get('/api/user', findUserByCredentials);
app.delete('/api/user/:userId', deleteUser);

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

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
            if (response.deletedCount === 1)
                res.sendStatus(200);
            else
                res.sendStatus(404);
        });
}
