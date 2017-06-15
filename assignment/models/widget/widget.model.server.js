var widgetSchema = require('./widget.schema.server');
var db = require('../db');

var widgetModel = db.model("WidgetModel", widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findWidgetsByPage = findWidgetsByPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidgets = reorderWidgets;

module.exports = widgetModel;

function createWidget(widget) {
    return widgetModel.create(widget);
}

function findWidgetsByPage(pageId) {
    return widgetModel.find({_page: pageId});
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.updateOne({_id: widgetId}, widget);
}

function deleteWidget(widgetId) {
    return findWidgetById(widgetId)
        .then(function(widget) {
            var index = widget.index;
            var pageId = widget._page;
            return widgetModel.updateMany(
                {_page: pageId, index: {$gt: index}}, {$inc: {index: -1}});
        })
        .then(function(response) {
            return widgetModel.remove({_id: widgetId});
        });

}

function reorderWidgets(pageId, iStart, iFinish) {
    var widget;

    return widgetModel
        .findOne({_page: pageId, index: iStart})
        .then(function(found) {
            widget = found;

            if (iStart > iFinish) {
                return widgetModel.updateMany(
                    {_page: pageId, index: {$gte: iFinish, $lt: iStart}},
                    {$inc: {index: 1}})
            } else {
                return widgetModel.updateMany(
                    {_page: pageId, index: {$lte: iFinish, $gt: iStart}},
                    {$inc: {index: -1}})
            }
        })
        .then(function(response) {
            return widgetModel.findByIdAndUpdate(widget._id, {index: iFinish});
        });
}