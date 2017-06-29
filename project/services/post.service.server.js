var app = require('../../express').projectRouter;
var postModel = require('../models/post/post.model.server');


app.get('/rest/post/:username', findPostsByUsername);

app.post('/rest/post/:username', post);

app.delete('/rest/post/:postid', removePost);



function findPostsByUsername(req, res) {
    var thread = 'user:' + req.params['username'];
    var limit = req.query['limit'];
    var offset = req.query['offset'];
    postModel.findPostsByThread(thread, limit, offset)
        .then(function(response) {
            res.json(response);
        }, function(err) {
            console.error(err);
        });
}

function post(req, res) {
    var user = req.user;

    if (typeof user === 'undefined') {
        res.send('Not logged in');
        return;
    }

    var username = req.params['username'];
    if (user.username !== username) {
        res.send(400);
        return;
    }
    var thread = 'user:' + username;
    var post = req.body;

    post.user = user._id;

    postModel.post(thread, post)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        });
}

function removePost(req, res) {
    var user = req.user;

    if (typeof user === 'undefined') {
        res.send('Not logged in');
        return;
    }

    var commentId = req.params['postid'];

    var response;
    if (user.role === 'ADMIN') {
        response = postModel.removePost(commentId);
    } else {
        response = postModel.removePost(commentId, user);
    }

    response
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        })
}