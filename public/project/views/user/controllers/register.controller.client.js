(function() {
    angular.module('Sharm')
        .controller('registerController', registerController);

    function registerController(userService, $location) {
        var model = this;

        model.register = register;


        function register(username, password, password2) {
            if (typeof username === 'undefined') {
                model.error = "Please enter a username";
                return;
            }

            if (typeof password === 'undefined') {
                model.error = "Please enter a password";
                return;
            }

            if (password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            var user = {
                username: username,
                password: password
            };
            userService.register(user)
                .then(function(user) {
                    console.log(user);
                    $location.url('/profile/' + user.username);
                });
        }
    }
})();