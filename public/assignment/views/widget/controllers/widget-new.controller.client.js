(function() {
    angular.module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($location, $routeParams, widgetService) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        model.createWidget = createWidget;

        function createWidget(type) {
            if (!(type === "HEADING" || type === "YOUTUBE" ||
                type === "HTML" || type === "IMAGE")) {
                return;
            }
            var widget = {};
            widget.widgetType = type;
            widgetService.createWidget(model.pageId, widget);
            $location.url(model.previousPage + widget._id);
        }

        model.pageName = "New Widget";
        model.previousPage = "/user/" + model.userId + "/website/" + model.websiteId
            + "/page/" + model.pageId + "/widget/";

        model.styleType = "page-style";
    }
})();