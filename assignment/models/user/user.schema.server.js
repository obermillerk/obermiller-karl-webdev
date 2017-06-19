var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    dateCreated: {type: Date, default: Date.now},
    websites: {type: [{type: mongoose.Schema.ObjectId, ref: 'WebsiteModel'}], default: []}
}, {collection: 'user'});

module.exports = userSchema;