var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.ObjectId, ref: 'WebsiteModel', require: true},
    name: {type: String, require: true},
    title: String,
    description: String,
    dateCreated: {type: Date, default: Date.now},
    dateModified: {type: Date, default: Date.now}
}, {collection: 'page'});

module.exports = pageSchema;