(function () {
    angular.module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var model = this;

        model.login = login;

        function login (username, password) {
            var user = userService.findUserByCredentials(username, password);

            if (user !== null) {
                $location.url('/user/' + user._id);
            } else {
                model.message = "Incorrect username or password."
            }
        }

        model.styleType = "website-style";
    }
})();