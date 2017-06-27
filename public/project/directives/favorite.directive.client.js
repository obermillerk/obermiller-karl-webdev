(function() {
    angular.module('Sharm')
        .directive('favorite', favorite);

    function favorite() {
        return {
            templateUrl: 'views/common/templates/favorite.view.client.html',
            controller: 'favoriteController',
            controllerAs: 'favorite',
            restrict: 'E'
        }
    }
})();