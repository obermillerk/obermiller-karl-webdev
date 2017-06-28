(function() {
    angular.module('Sharm')
        .controller('adminController', adminController);

    function adminController(allUsers, userService) {
        var model = this;

        model.allUsers = allUsers;

        model.createUser = createUser;
        model.deleteUser = deleteUser;

        function refreshUsers() {
            userService.getAllUsers()
                .then(function(users) {
                    model.allUsers = users;
                })
        }

        function createUser() {
            model.createError = undefined;

            if (!model.username || !model.password || !model.passConfirm) {
                return;
            }

            if (model.password !== model.passConfirm) {
                model.createError = 'Passwords don\'t match';
                return;
            }

            var user = {
                username: model.username,
                password: model.password
            };

            userService.createUser(user)
                .then(function(response) {
                    model.username = undefined;
                    model.password = undefined;
                    model.passConfirm = undefined;
                    refreshUsers();
                });
        }

        function deleteUser(user) {
            userService.unregister(user)
                .then(function(response) {
                    refreshUsers();
                });
        }
    }
})();