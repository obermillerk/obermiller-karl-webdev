(function() {
    angular.module("WebAppMaker")
        .factory("widgetService", widgetService);

    function widgetService() {
            var widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": "2", "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

            var api = {
                createWidget: createWidget,
                findWidgetsByPage: findWidgetsByPage,
                findWidgetById: findWidgetById,
                updateWidget: updateWidget,
                deleteWidget: deleteWidget
            };

            return api;

            function createWidget(pageId, widget) {
                widget._id = new Date().getTime()+"";
                widget.pageId = pageId;

                widgets.push(widget);
            }

            function findWidgetsByPage(pageId) {
                var pageWidgets = [];

                for (var w in widgets) {
                    var widget = widgets[w];
                    if (widget.pageId === pageId)
                        pageWidgets.push(widget);
                }

                return pageWidgets;
            }

            function findWidgetById(widgetId) {
                var widget = widgets.find(function(widget) {
                    return widget._id === widgetId;
                });

                if (typeof widget === 'undefined')
                    return null;
                return widget;
            }

            function updateWidget(widgetId, widget) {
                for (var w in widgets) {
                    var found = widgets[w];
                    if (found._id === widgetId) {
                        widgets[w] = widget;
                        return true;
                    }
                }
                return false;
            }

            function deleteWidget(widgetId) {
                for (var w in widgets) {
                    var widget = widgets[w];
                    if (widget._id === widgetId) {
                        widgets.splice(w, 1);
                        break;
                    }
                }
            }
        };
})();