(function () {
    angular.module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var model = this;

        model.login = login;

        function login (username, password) {
            model.message = null;
            if (typeof password === 'undefined') {
                model.message = "Please enter a password.";
                return;
            }

            var user = {
                username: username,
                password: password
            };

            userService
                .login(user)
                .then(success, error);

            function success(user) {
                $location.url('/profile');
            }

            function error() {
                model.message = "Incorrect username or password.";
            }
        }

        model.styleType = "website-style";
    }
})();