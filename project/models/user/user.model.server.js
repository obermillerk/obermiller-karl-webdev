var db = require('../db');
var userSchema = require('./user.schema.server');

var userModel = db.model('UserModel', userSchema);

module.exports = userModel;

userModel.followUser = followUser;
userModel.unfollowUser = unfollowUser;
userModel.createUser = createUser;
userModel.deleteUser = deleteUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.isUserFollowing = isUserFollowing;

function followUser(followerId, userId) {
    return userModel.updateOne({_id: followerId}, {$addToSet: {following: userId}});
}

function unfollowUser(followerId, userId) {
    return userModel.updateOne({_id: followerId}, {$pull: {following: userId}});
}

function createUser(user) {
    return userModel.create(user);
}

function deleteUser(userId) {
    return userModel.remove({ _id: userId });
}

function findUserByCredentials(username, password) {
    return userModel.findOne({ username: username, password: password })
        .populate('following')
        .exec();
}

function findUserById(userId) {
    return userModel.findById(userId)
        .populate('following')
        .exec();
}

function findUserByUsername(username) {
    return userModel.findOne({ username: username })
        .populate('following')
        .exec();
}

function isUserFollowing(follower, user) {
    return userModel.findOne({ _id: follower._id })
        .then(function(found) {
            return found.following.indexOf(user._id) > -1;
        });
}