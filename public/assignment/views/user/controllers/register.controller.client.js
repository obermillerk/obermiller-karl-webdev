(function () {
    angular.module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, userService) {
        var model = this;

        model.register = register;

        function register(username, password, password2) {
            if (password !== password2) {
                model.error = "Passwords must match.";
                return null;
            }

            var user = userService.findUserByUsername(username);

            if (user !== null) {
                model.error = "Username unavailable.";
                return null;
            } else {
                user = {
                    username: username,
                    password: password
                };
                userService.createUser(user);
                user = userService.findUserByCredentials(username, password);
                $location.url("/user/" + user._id);
            }
        }
    }
})();