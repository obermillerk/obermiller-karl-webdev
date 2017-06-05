(function() {
    angular
        .module("WebAppMaker")
        .directive("wdDraggable", wdDraggable)
        .directive("wdNavHeader", wdNavHeader)
        .directive("wdNavFooter", wdNavFooter)
        .directive("wdNavWrapper", wdNavWrapper);

    function wdDraggable() {
        function linkFunction(scope, element) {
            $(element).sortable({handle: ".wd-handle",
                axis: "y"});
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