var app = require("../../express");

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

    var widget = findWidget(function(widget) {
        return widget._id === widgetId;
    });

    if (widget !== null) {
        widget.url = '/assignment/uploads/' + filename;
        updateWidget(widgetId, widget);
    }

    var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
    res.redirect(callbackUrl);
}

app.put("/api/page/:pageId/widget", orderWidgets);

function orderWidgets(req, res) {
    var pageId = req.params['pageId'];
    var indexOld = Number(req.query['initial']);
    var indexNew = Number(req.query['final']);

    var widget = findWidget(function(widget) {
        return widget.pageId === pageId && widget.index === indexOld;
    });

    if (widget === null) {
        res.sendStatus(404);
        return;
    }

    widget.index = indexNew;

    var update;

    if (indexOld > indexNew) {
        update = function(wg) {
            if (wg.index >= indexNew && wg.index < indexOld) {
                wg.index++;
            }
        }
    } else {
        update = function(wg) {
            if (wg.index <= indexNew && wg.index > indexOld)
                wg.index--;
        }
    }

    for (var i in widgets) {
        var wg = widgets[i];
        if (wg.pageId === pageId && wg._id !== widget._id)
            update(wg);
    }

    res.sendStatus(200);
}

app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findWidgetsByPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", reqUpdateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);

var widgetCount = {
    "321": 7
};

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": "2", "text": "GIZMODO", "index": 0},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum", "index": 1},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/", "index": 2},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "index": 3},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum", "index": 4},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E", "index": 5 },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "index": 6}
];

function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;

    widget._id = new Date().getTime()+"";
    widget.pageId = pageId;
    widget.index = widgetCount[pageId]++;

    widgets.push(widget);
    res.json(widget);
}

function findWidgetsByPage(req, res) {
    var pageId = req.params['pageId'];

    var pageWidgets = [];
    for (var w in widgets) {
        var widget = widgets[w];
        if (widget.pageId === pageId)
            pageWidgets.push(widget);
    }

    pageWidgets.sort(function(widget1, widget2) {
        return widget1.index - widget2.index;
    });

    res.send(pageWidgets);
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];

    for (var wd in widgets) {
        var widget = widgets[wd];
        if (widget._id === widgetId) {
            res.json(widget);
            return;
        }
    }

    res.sendStatus(404);
}

function reqUpdateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = req.body;

    widget = updateWidget(widgetId, widget);
    if (widget === null) {
        res.sendStatus(404);
    } else {
        res.json(widget);
    }
}

function updateWidget(widgetId, widget) {
    for (var wd in widgets) {
        var found = widgets[wd];
        if (found._id === widgetId) {
            widgets[wd] = widget;
            return widget;
        }
    }
    return null;
}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];

    for (var wd in widgets) {
        var widget = widgets[wd];
        if (widget._id === widgetId) {
            fixIndexes(widget.pageId, widget.index);
            widgets.splice(wd, 1);
            res.sendStatus(200);
            return;
        }
    }

    function fixIndexes(pageId, index) {
        widgetCount[pageId]--;
        for (var wd in widgets) {
            var widget = widgets[wd];
            if (widget.pageId === pageId && widget.index > index) {
                widget.index--;
            }
        }
    }

    res.sendStatus(404);
}

function findWidget(comparator) {
    var found = widgets.find(comparator);
    if (typeof found === 'undefined')
        return null;
    return found;
}