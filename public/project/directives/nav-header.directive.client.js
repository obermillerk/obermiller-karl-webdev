(function() {
    angular.module('Sharm')
        .directive('navHeader', navHeader);

    function navHeader() {
        return {
            templateUrl: 'views/common/templates/nav-header.view.client.html',
            controller: 'navHeaderController',
            controllerAs: 'nav'
        }
    }
})();