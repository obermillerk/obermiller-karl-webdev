var db = require('../db');
var userSchema = require('./user.schema.server');

var userModel = db.model('UserModel', userSchema);

module.exports = userModel;

userModel.getAllUsers = getAllUsers;
userModel.followUser = followUser;
userModel.unfollowUser = unfollowUser;
userModel.createUser = createUser;
userModel.unregister = unregister;
userModel.updateUser = updateUser;
userModel.findUserWithCredentials = findUserWithCredentials;
userModel.findUserById = findUserById;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByUsername = findUserByUsername;
userModel.isUserFollowing = isUserFollowing;
userModel.isInLibrary = isInLibrary;
userModel.addToLibrary = addToLibrary;
userModel.removeFromLibrary = removeFromLibrary;
userModel.isInFavorites = isInFavorites;
userModel.addToFavorites = addToFavorites;
userModel.removeFromFavorites = removeFromFavorites;

function followUser(followerId, userId) {
    return userModel.updateOne({_id: followerId}, {$addToSet: {following: userId}})
        .then(function(response) {
            return userModel.updateOne({_id: userId}, {$addToSet: {followers: followerId}});
        });
}

function unfollowUser(followerId, userId) {
    return userModel.updateOne({_id: followerId}, {$pull: {following: userId}})
        .then(function(response) {
            return userModel.updateOne({_id: userId}, {$pull: {followers: followerId}});
        });
}

function createUser(user) {
    return userModel.create(user);
}

function updateUser(userId, newUser) {
    return userModel.updateOne({_id: userId}, newUser);
}

function unregister(userId) {
    return userModel.remove({ _id: userId });
}

function getAllUsers() {
    return userModel.find();
}

function findUserWithCredentials(username) {
    return userModel.findOne({ username: username })
        .select("+password")
        .populate('following')
        .populate('followers')
        .exec();
}

function findUserById(userId) {
    return userModel.findById(userId)
        .populate('following')
        .populate('followers')
        .exec();
}

function findUserByGoogleId(googleId) {
    return userModel.findOne( {'google.id': googleId} )
        .populate('following')
        .populate('followers')
        .exec();
}

function findUserByUsername(username) {
    return userModel.findOne({ username: username })
        .populate('following')
        .populate('followers')
        .exec();
}

function isUserFollowing(follower, user) {
    return userModel.findOne({ _id: follower._id })
        .then(function(found) {
            return found.following.indexOf(user._id) > -1;
        });
}

function isInLibrary(user, type, id) {
    var field = type + 's';
    return userModel.findOne({_id: user._id})
        .then(function(found) {
            return found.library[field].indexOf(id) > -1;
        })
}

function addToLibrary(user, type, id) {
    var field = 'library.' + type + 's';
    return userModel.updateOne({_id: user._id},
        {$addToSet: {[field]: id}} );
}

function removeFromLibrary(user, type, id) {
    var field = 'library.' + type + 's';
    return userModel.updateOne({_id: user._id},
        {$pull: {[field]: id}} );
}

function isInFavorites(user, artistId) {
    return userModel.findOne({_id: user._id})
        .then(function(found) {
            return found.favorite_artists.indexOf(artistId) > -1;
        })
}

function addToFavorites(user, artistId) {
    return userModel.updateOne({_id: user._id},
        {$addToSet: {favorite_artists: artistId}} );
}

function removeFromFavorites(user, artistId) {
    return userModel.updateOne({_id: user._id},
        {$pull: {favorite_artists: artistId}} );
}