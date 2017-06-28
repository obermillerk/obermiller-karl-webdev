(function() {
    angular.module('Sharm')
        .controller('registerController', registerController);

    function registerController(userService, $location) {
        var model = this;

        model.register = register;


        function register(username, password, password2, email, name) {
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
                password: password,
                email: email,
                name: name
            };
            userService.register(user)
                .then(function(user) {
                    $location.url('/profile/' + user.username);
                });
        }
    }
})();