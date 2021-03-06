(function() {
    angular.module("WebAppMaker")
        .factory("widgetService", widgetService);

    function widgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetsByPage: findWidgetsByPage,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };

        return api;

        function createWidget(pageId, widget) {
            var url = "/assignment/api/page/" + pageId + "/widget";

            return $http.post(url, widget).then(unwrapData);
        }

        function findWidgetsByPage(pageId) {
            var url = "/assignment/api/page/" + pageId + "/widget";

            return $http.get(url).then(unwrapData);
        }

        function findWidgetById(widgetId) {
            var url = "/assignment/api/widget/" + widgetId;

            return $http.get(url).then(unwrapData);
        }

        function updateWidget(widgetId, widget) {
            var url = "/assignment/api/widget/" + widgetId;

            return $http.put(url, widget).then(unwrapData);
        }

        function deleteWidget(widgetId) {
            var url = "/assignment/api/widget/" + widgetId;

            return $http.delete(url);
        }

        function unwrapData(response) {
            return response.data;
        }
    };
})();