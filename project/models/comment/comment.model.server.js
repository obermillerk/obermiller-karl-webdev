var db = require('../db');
var commentSchema = require('./comment.schema.server');

var commentModel = db.model('CommentModel', commentSchema);

module.exports = commentModel;

commentModel.findCommentsByThread = findCommentsByThread;
commentModel.findCommentsByUser = findCommentsByUser;
commentModel.postComment = postComment;
commentModel.removeComment = removeComment;
commentModel.deleteCommentsByUserId = deleteCommentsByUserId;

function findCommentsByThread(thread, limit, offset) {
    var result = commentModel.find({thread: thread})
        .populate('user')
        .sort({date: -1});
    if (offset)
        result = result.skip(Number(offset));
    if(limit)
        result = result.limit(Number(limit));
    return result.exec();
}

function findCommentsByUser(user) {
    return commentModel.find({user: user._id})
        .populate('user')
        .sort({date: -1})
        .exec();
}

function postComment(thread, comment) {
    comment.thread = thread;
    return commentModel.create(comment);
}

function removeComment(commentId, user) {
    if (user)
        return commentModel.remove({_id: commentId, user: user._id});
    else
        return commentModel.remove({_id: commentId});
}

function deleteCommentsByUserId(userId) {
    return commentModel.remove( {user: userId} );
}