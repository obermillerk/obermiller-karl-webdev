var db = require('../db');
var commentSchema = require('./comment.schema.server');

var commentModel = db.model('CommentModel', commentSchema);

module.exports = commentModel;

commentModel.findCommentsByThread = findCommentsByThread;
commentModel.postComment = postComment;
commentModel.removeComment = removeComment;

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

function postComment(thread, comment) {
    comment.thread = thread;
    return commentModel.create(comment);
}

function removeComment(user, commentId) {
    return commentModel.remove({_id: commentId, user: user._id});
}