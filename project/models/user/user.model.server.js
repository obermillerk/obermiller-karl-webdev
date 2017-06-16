var db = require('../db');
var userSchema = require('./user.schema.server');

var userModel = db.model('UserModel', userSchema);

module.exports = userModel;

userModel.followUser = followUser;
userModel.unfollowUser = unfollowUser;
userModel.createUser = createUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;

function followUser(followerId, userId) {
    userModel.findOneAndUpdate({_id: followerId}, {$addToSet: {following: userId}});
}

function unfollowUser(followerId, userId) {
    userModel.findOneAndUpdate({_id: followerId}, {$pull: {following: userId}});
}

function createUser(user) {
    return userModel.create(user);
}

function findUserByCredentials(username, password) {
    return userModel.findOne({ username: username, password: password });
}

function findUserById(userId) {
    return userModel.findById(userId);
}