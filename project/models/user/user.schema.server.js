var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    following: {type: [{type: mongoose.Schema.ObjectId, ref: 'UserModel'}], default: []}
}, {collection: 'user'});

module.exports = userSchema;