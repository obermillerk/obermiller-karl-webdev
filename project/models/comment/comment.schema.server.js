var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    content: {type: String, required: true},
    user: {type: mongoose.Schema.ObjectId, ref: 'UserModel', required: true},
    date: {type: Date, default: Date.now},
    thread: {type: String, required: true}
}, {collection: 'comment'});

module.exports = commentSchema;