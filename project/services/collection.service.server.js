var app = require('../../express').projectRouter;
var collectionModel = require('../models/collection/collection.model.server');
var userModel = require('../models/user/user.model.server');

app.post('/rest/collection', createCollection);

app.delete('/rest/collection/:collectionid', deleteCollection);
app.delete('/rest/collection/:collectionid/:type/:id', removeFromCollection);

app.get('/rest/collection/user/:username', findCollectionsByUser);
app.get('/rest/collection/:collectionid', getCollection);

app.put('/rest/collection/:collectionid/:type', addToCollection);


function createCollection(req, res) {
    var loggedin = req.user;

    if (typeof loggedin === 'undefined') {
        res.send('Not logged in');
        return;
    }

    var collName = req.body.name;

    collectionModel.createCollection(loggedin, collName)
        .then(function(response) {
            res.send(response);
        }, function(err) {
            res.sendStatus(400);
        });
}


function deleteCollection(req, res) {
    var loggedin = req.user;

    if (typeof loggedin === 'undefined') {
        res.send('Not logged in');
        return;
    }

    var collectionId = req.params['collectionid'];

    collectionModel.deleteCollection(collectionId, loggedin)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            res.sendStatus(401);
        });
}

function addToCollection(req, res) {
    var loggedin = req.user;

    if (typeof loggedin === 'undefined') {
        res.status(401).send('Not logged in');
        return;
    }

    var collectionId = req.params['collectionid'];
    var type = req.params['type'];

    collectionModel.addToCollection(collectionId, type, req.body.id, loggedin)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            res.sendStatus(401);
        });
}

function removeFromCollection(req, res) {
    var loggedin = req.user;

    if (typeof loggedin === 'undefined') {
        res.status(401).send('Not logged in');
        return;
    }

    var collectionId = req.params['collectionid'];
    var type = req.params['type'];
    var id = req.params['id'];

    collectionModel.removeFromCollection(collectionId, type, id, loggedin)
        .then(function(response) {
            if (response.nModified > 0)
                res.sendStatus(200);
            else
                res.sendStatus(401);
        }, function(err) {
            res.sendStatus(401);
        });
}

function getCollection(req, res) {
    var collectionId = req.params['collectionid'];

    collectionModel.getCollection(collectionId)
        .then(function(collection) {
            res.json(collection);
        }, function(err) {
            res.sendStatus(400);
        });
}

function findCollectionsByUser(req, res) {
    var username = req.params['username'];

    userModel.findUserByUsername(username)
        .then(function(user) {
            return collectionModel.findCollectionsByUser(user._id);
        }, function(err) {
            res.sendStatus(404);
        })
        .then(function(collections) {
            res.json(collections);
        });
}