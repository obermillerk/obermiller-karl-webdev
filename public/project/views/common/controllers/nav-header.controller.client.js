(function () {
    angular.module('Sharm')
        .controller('navHeaderController', navHeaderController);

    function navHeaderController($route, $location, userService) {
        var model = this;

        userService.getCurrentUser()
            .then(function(currentUser) {
                model.currentUser = currentUser;
                model.logout = logout;
                model.unregister = unregister;
            });

        function logout() {
            userService.logout()
                .then(function (response) {
                    $route.reload();
                });
        }

        function unregister() {
            userService.unregister(model.currentUser)
                .then(function (response) {
                    $location.url('/');
                })
        }
    }
})();