(function() {
    angular
        .module("WebAppMaker")
        .directive("wdDraggable", wdDraggable)
        .directive("wdNavHeader", wdNavHeader)
        .directive("wdNavFooter", wdNavFooter)
        .directive("wdNavWrapper", wdNavWrapper);

    function wdDraggable($http, $routeParams) {

        function linkFunction(scope, element) {
            var initial, final, pageId;
            $(element).sortable({
                handle: ".wd-handle",
                tolerance: 'touch',
                axis: "y",
                start: function(event, ui) {
                    initial = ui.item.index();
                },
                stop: function(event, ui) {
                    pageId = $routeParams['pid'];
                    final = ui.item.index();
                    var url = "/api/page/" + pageId + "/widget?initial=" + initial + "&final=" + final;
                    $http.put(url);
                }
            });
        }

        return {
            link: linkFunction
        }
    }

    function wdNavHeader() {
        return {
            templateUrl: '/assignment/views/common/templates/navbar-header.view.client.html'
        }
    }

    function wdNavFooter() {
        return {
            templateUrl: '/assignment/views/common/templates/navbar-footer.view.client.html'
        }
    }

    function wdNavWrapper() {

        return {
            transclude: true,
            templateUrl: '/assignment/views/common/templates/navbar-wrapper.view.client.html'
        }
    }
})();