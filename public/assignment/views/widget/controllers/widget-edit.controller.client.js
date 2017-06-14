(function() {
    angular.module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($location, $routeParams, widgetService) {
        var model = this;

        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        widgetService
            .findWidgetById(model.widgetId).then(renderWidget);

        function renderWidget(data) {
            model.widget = data;
        }

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function updateWidget() {
            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function() {
                    $location.url(model.previousPage);
                });
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(model.widgetId)
                .then(function() {
                    $location.url(model.previousPage);
                });
        }

        model.pageName = "Edit Widget";
        model.previousPage = "/website/" + model.websiteId
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