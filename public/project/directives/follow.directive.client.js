(function() {
    angular.module('Sharm')
        .directive('follow', follow);

    function follow() {
        return {
            templateUrl: 'views/common/templates/follow.view.client.html',
            controller: 'followController',
            controllerAs: 'follow'
        }
    }
})();