var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    content: {type: String, required: true},
    user: {type: mongoose.Schema.ObjectId, ref: 'UserModel', required: true},
    date: {type: Date, default: Date.now},
    thread: {type: String, required: true}
}, {collection: 'post'});

module.exports = postSchema;