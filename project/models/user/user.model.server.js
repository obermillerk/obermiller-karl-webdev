var db = require('../db');
var userSchema = require('./user.schema.server');

var userModel = db.model('UserModel', userSchema);

module.exports = userModel;

userModel.followUser = followUser;
userModel.unfollowUser = unfollowUser;
userModel.createUser = createUser;
userModel.unregister = unregister;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.isUserFollowing = isUserFollowing;
userModel.userHasTrack = userHasTrack;
userModel.addTrackToLibrary = addTrackToLibrary;
userModel.removeTrackFromLibrary = removeTrackFromLibrary;

function followUser(followerId, userId) {
    return userModel.updateOne({_id: followerId}, {$addToSet: {following: userId}});
}

function unfollowUser(followerId, userId) {
    return userModel.updateOne({_id: followerId}, {$pull: {following: userId}});
}

function createUser(user) {
    return userModel.create(user);
}

function unregister(userId) {
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

function userHasTrack(user, trackId) {
    return userModel.findOne({_id: user._id})
        .then(function(found) {
            return found.library.tracks.indexOf(trackId) > -1;
        })
}

function addTrackToLibrary(user, trackId) {
    return userModel.updateOne({_id: user._id},
        {$addToSet: {'library.tracks': trackId}} );
}

function removeTrackFromLibrary(user, trackId) {
    return userModel.updateOne({_id: user._id},
        {$pull: {'library.tracks': trackId}});
}