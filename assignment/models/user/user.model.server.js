var mongoose = require('mongoose');
var q = require('q');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

module.exports = userModel;

function createUser(user) {
    var deferred = q.defer();
    userModel.findUserByUsername(user.username)
        .then(function(found) {
            if (found === null)
                userModel
                    .create(user)
                    .then(function (user) {
                        deferred.resolve(user);
                    });
            else
                deferred.reject(409);
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