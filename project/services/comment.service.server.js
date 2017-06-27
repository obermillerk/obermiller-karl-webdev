var app = require('../../express').projectRouter;
var commentModel = require('../models/comment/comment.model.server');


app.get('/rest/comment/:thread', findCommentsByThread);

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
    commentModel.removeComment(user, commentId)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        })
}
