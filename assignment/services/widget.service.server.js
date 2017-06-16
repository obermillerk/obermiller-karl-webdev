var app = require("../../express").assignmentRouter;
var widgetModel = require('../models/widget/widget.model.server');
var pageModel = require('../models/page/page.model.server');
var mongoose = require('mongoose');

var multer = require('multer');
var upload = multer({ dest: __dirname + '/../../public/assignment/uploads' });

app.post("/api/upload", upload.single('upload'), uploadImage);

function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var file = req.file;

    var filename = file.filename;

    widgetModel
        .findWidgetById(widgetId)
        .then(function(widget) {
            if (widget !== null) {
                widget.url = '/assignment/uploads/' + filename;
                return widgetModel.updateWidget(widgetId, widget);
            }
        })
        .then(function(response) {
            var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
            res.redirect(callbackUrl);
        });
}

app.put("/api/page/:pageId/widget", reorderWidgets);

function reorderWidgets(req, res) {
    var pageId = req.params['pageId'];
    var indexOld = Number(req.query['initial']);
    var indexNew = Number(req.query['final']);

    widgetModel
        .reorderWidgets(pageId, indexOld, indexNew)
        .then(function(response) {
            res.sendStatus(200);
        })
}

app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findWidgetsByPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);

function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;

    widget._page = pageId;

    pageModel.findPageById(pageId)
        .then(function(page) {
            if (page === null) {
                res.sendStatus(404);
                return;
            }
            widget.index = page.numWidgets;

            widgetModel
                .createWidget(widget)
                .then(function(widget) {
                    var widgets = page.widgets;
                    widgets.push(widget);
                    pageModel
                        .updatePage(pageId,
                            {widgets: widgets, $inc: {numWidgets: 1}})
                        .then(function(response) {
                            res.json(widget);
                        })
                })
        });
}

function findWidgetsByPage(req, res) {
    var pageId = req.params['pageId'];

    widgetModel
        .findWidgetsByPage(pageId)
        .then(function(widgets) {
            widgets.sort(function(widget1, widget2) {
                return widget1.index - widget2.index;
            });

            res.send(widgets);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];

    widgetModel
        .findWidgetById(widgetId)
        .then(function(widget) {
            if (widget === null)
                res.sendStatus(404);
            else
                res.json(widget);
        });
}

function updateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = req.body;

    widget.dateModified = new Date();

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function(response) {
            if (response.n === 1)
                res.sendStatus(200);
            else
                res.sendStatus(404);
        });
}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var pageId;
    var widget;

    widgetModel
        .findWidgetById(widgetId)
        .then(function(found) {
            widget = found;
            pageId = widget._page;
            return widgetModel.deleteWidget(widgetId);
        })
        .then(function(response) {
            if (response.result.n === 1)
                pageModel
                    .findPageById(pageId)
                    .then(removeFromPage)
                    .then(function(response) {
                        res.sendStatus(200);
                    });
            else
                res.sendStatus(404);
        });

    function removeFromPage(page) {
        // If page is null, we don't need to worry about removing the widget from it.
        if (page !== null) {
            var widgets = page.widgets;
            var ind = widgets.indexOf(mongoose.Types.ObjectId(widgetId));
            widgets.splice(ind, 1);
            return pageModel
                .updatePage(pageId,
                    {widgets: widgets, $inc: {numWidgets: -1}});
        }
    }
}