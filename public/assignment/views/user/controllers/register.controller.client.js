(function () {
    angular.module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, $rootScope, userService) {
        var model = this;

        model.register = register;

        function register(username, password, password2) {
            model.error = null;

            if (password !== password2) {
                model.error = "Passwords must match.";
                return;
            }
            var user = {
                username: username,
                password: password
            };

            userService
                .register(user)
                .then(success, error);


            function success(user) {
                $rootScope.currentUser = user;
                $location.url("/profile");
            }
            function error() {
                model.error = "Username taken.";
            }
        }

        model.styleType = "website-style";
    }
})();