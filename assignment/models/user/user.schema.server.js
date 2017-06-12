var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'user'});

module.exports = userSchema;