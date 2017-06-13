var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.ObjectId, ref: "PageModel", required: true},
    widgetType: {type: String,
        enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'],
        required: true},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: {type: String, default: '100%'},
    height: String,
    rows: Number,
    size: {type: String, min: 1, max: 6},
    class: String,
    icon: String,
    deleteable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now},
    dateModified: {type: Date, default: Date.now},
    index: {type: Number, required: true}
}, {collection: 'widget'});

module.exports = widgetSchema;