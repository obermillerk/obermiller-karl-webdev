(function() {
    angular.module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($location, $routeParams, widgetService) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        model.widget = angular.copy(widgetService.findWidgetById(model.widgetId));

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function updateWidget() {
            widgetService.updateWidget(model.widgetId, model.widget);
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
        }

        model.pageName = "Edit Widget";
        model.previousPage = "/user/" + model.userId + "/website/" + model.websiteId
            + "/page/" + model.pageId + "/widget/";

        model.navOptions = [
            {name: "Confirm",
                href: model.previousPage,
                glyphicon: "ok",
                click: updateWidget},
            {name: "Delete",
                href: model.previousPage,
                glyphicon: "trash",
                click: deleteWidget}
        ];

        model.styleType = "page-style";
    }
})();