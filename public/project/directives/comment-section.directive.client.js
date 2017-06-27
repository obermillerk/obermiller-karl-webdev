(function () {
    angular.module('Sharm')
        .directive('commentSection', commentSection);

    function commentSection() {
        return {
            templateUrl: 'views/common/templates/comment-section.view.client.html',
            controller: 'commentSectionController',
            controllerAs: 'model',
            restrict: 'E',
            scope: {
                thread: '@thread'
            }
        }
    }
})();