(function() {
    angular.module('Sharm')
        .controller('loginController', loginController);

    function loginController(userService, $location) {
        var model = this;

        model.login = login;

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };

            userService.login(user)
                .then(function(user) {
                    $location.url('/profile/' + user.username);
                });
        }
    }
})();