(function() {
    angular.module('Sharm')
        .directive('library', library);

    function library() {
        return {
            templateUrl: 'views/common/templates/library.view.client.html',
            controller: 'libraryController',
            controllerAs: 'library',
            restrict: 'E'
        }
    }
})();