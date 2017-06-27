var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    following: {type: [{type: mongoose.Schema.ObjectId, ref: 'UserModel'}], default: []},
    followers: {type: [{type: mongoose.Schema.ObjectId, ref: 'UserModel'}], default: []},
    library: {
        tracks: {type: [{type: String}], default: []},
        albums: {type: [{type: String}], default: []}
    },
    favorite_artists: {type: [{type: String}], default: []}
}, {collection: 'user'});

module.exports = userSchema;