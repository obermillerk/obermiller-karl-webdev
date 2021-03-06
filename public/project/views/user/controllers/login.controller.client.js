(function() {
    angular.module('Sharm')
        .controller('loginController', loginController);

    function loginController(userService, $route) {
        var model = this;

        model.login = login;

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };

            userService.login(user)
                .then(function(user) {
                    $route.reload();
                }, function(err) {
                    if (err.statusText === 'Unauthorized')
                        model.err = 'Bad username or password';
                });
        }
    }
})();