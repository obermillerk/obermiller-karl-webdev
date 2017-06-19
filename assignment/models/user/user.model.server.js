var db = require('../db');
var q = require('q');
var userSchema = require('./user.schema.server');

var userModel = db.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByFacebookId = findUserByFacebookId;

module.exports = userModel;

function createUser(user) {
    var deferred = q.defer();
    userModel.findUserByUsername(user.username)
        .then(function(found) {
            if (found === null) {
                userModel
                    .create(user)
                    .then(function (user) {
                        deferred.resolve(user);
                    });
            }
            else {
                deferred.reject();
            }
        });
    return deferred.promise;
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, user) {
    return userModel.updateOne({_id: userId}, user);
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}