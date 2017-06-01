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

            userService
                .findUserByCredentials(username, password)
                .then(login, error);

            function login(user) {
                $location.url('/user/' + user._id);
            }

            function error() {
                model.message = "Incorrect username or password.";
            }
        }

        model.styleType = "website-style";
    }
})();