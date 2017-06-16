var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    following: {type: [{type: mongoose.Schema.ObjectId, ref: 'UserModel'}], default: []},
    zone: {type: String, enum: ['project'], default: 'project'}
}, {collection: 'user'});

module.exports = userSchema;