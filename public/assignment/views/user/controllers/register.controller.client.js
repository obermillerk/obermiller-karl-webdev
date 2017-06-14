(function () {
    angular.module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, $rootScope, userService) {
        var model = this;

        model.register = register;

        function register(username, password, password2) {
            model.error = null;

            // Requires non-empty username and password
            if (typeof username === 'undefined') {
                model.error = "Please enter a username.";
                return;
            }
            if (typeof password === 'undefined') {
                model.error = "Please enter a password.";
                return;
            }

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