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

    userModel.createUser(user).then(function(user) {
        res.status(201);
        res.json(user);
    }, function() {
        res.sendStatus(409);
    });
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    var user = findUser(function(user) {
        return user._id === userId;
    });

    if (user === null) {
        res.sendStatus(404);
        return;
    }

    res.json(user);
}

function findUserByCredentials(req, res) {
    var password = req.query['password'];

    if (typeof password === 'undefined')
        return findUserByUsername(req, res);

    var username = req.query['username'];

    var user = findUser(function(user) {
        return user.username === username && user.password === password;
    });

    if (user === null) {
        res.sendStatus(404);
        return;
    }

    res.json(user);
}

function findUserByUsername(req, res) {
    var username = req.query['username'];
    var user = findUser(function(user) {
        return user.username === username;
    });

    if (user === null) {
        res.sendStatus(404);
        return;
    }

    res.json(user);
}

function updateUser(req, res) {
    var user = req.body;
    var userId = user._id;

    for (var u in users) {
        var found = users[u];
        if (found._id === userId) {
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteUser(req, res) {
    var userId = req.params['userId'];

    for (var u in users) {
        if (users[u]._id === userId) {
            users.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function findUser(comparator) {
    var found = users.find(comparator);
    if (typeof found === 'undefined')
        return null;
    return found;
}
