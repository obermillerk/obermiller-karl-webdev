(function() {
    angular.module('Sharm')
        .directive('loginModal', loginModal);

    function loginModal() {
        return {
            templateUrl: 'views/common/templates/login-modal.view.client.html'
        };
    }
})();