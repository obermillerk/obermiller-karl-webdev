(function () {
    angular.module('Sharm')
        .directive('postFeed', postFeed);

    function postFeed() {
        return {
            templateUrl: 'views/common/templates/post-feed.view.client.html',
            controller: 'postFeedController',
            controllerAs: 'model',
            restrict: 'E',
            scope: {
                username: '@username'
            }
        }
    }
})();