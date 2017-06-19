(function() {
    angular.module('Sharm')
        .controller('loginController', loginController);

    function loginController(userService, $route, $routeParams) {
        var model = this;
        if ($routeParams['msg']) {
            var msg = $routeParams['msg'];
            if (msg === 'follow')
                model.message = "You must login to follow someone!";
        }

        model.login = login;

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };

            userService.login(user)
                .then(function(user) {
                    $route.reload();
                });
        }
    }
})();