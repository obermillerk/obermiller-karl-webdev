var db = require('../db');
var postSchema = require('./post.schema.server');

var postModel = db.model('PostModel', postSchema);

module.exports = postModel;

postModel.findPostsByThread = findPostsByThread;
postModel.post = post;
postModel.removePost = removePost;
postModel.deletePostsByUserId = deletePostsByUserId;

function findPostsByThread(thread, limit, offset) {
    var result = postModel.find({thread: thread})
        .populate('user')
        .sort({date: -1});
    if (offset)
        result = result.skip(Number(offset));
    if(limit)
        result = result.limit(Number(limit));
    return result.exec();
}

function post(thread, post) {
    post.thread = thread;
    return postModel.create(post);
}

function removePost(postId, user) {
    if (user)
        return postModel.remove({_id: postId, user: user._id});
    else
        return postModel.remove({_id: postId});
}

function deletePostsByUserId(userId) {
    return postModel.remove( {user: userId} );
}