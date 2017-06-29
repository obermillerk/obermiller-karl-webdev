var mongoose = require('mongoose');

var collectionSchema = mongoose.Schema({
        name: {type: String, required: true},
        user: {type: mongoose.Schema.ObjectId, ref: 'UserModel', required: true},
        tracks: {type: [{type: String}], default: []},
        albums: {type: [{type: String}], default: []}
    }, {collection: 'collection'});

module.exports = collectionSchema;