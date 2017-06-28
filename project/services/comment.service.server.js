var app = require('../../express').projectRouter;
var commentModel = require('../models/comment/comment.model.server');
var userModel = require('../models/user/user.model.server');


app.get('/rest/comment/:thread', findCommentsByThread);
app.get('/rest/comment/user/:username', findCommentsByUsername);

app.post('/rest/comment/:thread', postComment);

app.delete('/rest/comment/:commentid', removeComment);

function findCommentsByThread(req, res) {
    var thread = req.params['thread'];
    var limit = req.query['limit'];
    var offset = req.query['offset'];
    commentModel.findCommentsByThread(thread, limit, offset)
        .then(function(response) {
            res.json(response);
        }, function(err) {
            console.log(err);
        });
}

function findCommentsByUsername(req, res) {
    var username = req.params['username'];

    userModel.findUserByUsername(username)
        .then(function(user) {
            return commentModel.findCommentsByUser(user)
                .then(function(response) {
                    res.json(response);
                }, function(err) {
                    console.log(err);
                });
        });
}

function postComment(req, res) {
    var user = req.user;

    if (typeof user === 'undefined') {
        res.send('Not logged in');
        return;
    }

    var thread = req.params['thread'];
    var comment = req.body;

    comment.user = user._id;

    commentModel.postComment(thread, comment)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        });
}

function removeComment(req, res) {
    var user = req.user;

    if (typeof user === 'undefined') {
        res.send('Not logged in');
        return;
    }

    var commentId = req.params['commentid'];

    var response;
    if (user.role === 'ADMIN') {
        response = commentModel.removeComment(commentId);
    } else {
        response = commentModel.removeComment(commentId, user);
    }

    response
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        })
}