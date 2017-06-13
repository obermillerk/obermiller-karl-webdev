var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.ObjectId, ref: 'WebsiteModel', required: true},
    name: {type: String, required: true},
    title: String,
    description: String,
    dateCreated: {type: Date, default: Date.now},
    dateModified: {type: Date, default: Date.now},
    widgets: {type: [{type: mongoose.Schema.ObjectId, ref: 'WidgetModel'}], default: []},
    numWidgets: {type: Number, default: 0, min: 0}
}, {collection: 'page'});

module.exports = pageSchema;