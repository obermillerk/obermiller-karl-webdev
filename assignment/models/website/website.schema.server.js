var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: 'UserModel', required: true},
    name: {type: String, required: true},
    description: String,
    dateCreated: {type: Date, default: Date.now},
    dateModified: {type: Date, default: Date.now},
    pages: {type: [{type: mongoose.Schema.ObjectId, ref: 'PageModel'}], default: []}
}, {collection: 'website'});

module.exports = websiteSchema;