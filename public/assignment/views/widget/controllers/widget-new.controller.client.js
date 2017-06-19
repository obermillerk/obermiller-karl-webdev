(function() {
    angular.module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($location, $routeParams, widgetService) {
        var model = this;

        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        model.createWidget = createWidget;

        function createWidget(type) {
            if (!(type === "HEADING" || type === "YOUTUBE" ||
                type === "HTML" || type === "IMAGE" || type === "INPUT")) {
                return;
            }
            var widget = model.widget;
            widget.widgetType = type;
            if (type === "HEADING") {
                widget.size = "3";
            }
            widgetService
                .createWidget(model.pageId, widget)
                .then(function(data) {
                    $location.url(model.previousPage + data._id);
                });
        }

        model.pageName = "New Widget";
        model.previousPage = "/website/" + model.websiteId
            + "/page/" + model.pageId + "/widget/";

        model.styleType = "page-style";
    }
})();