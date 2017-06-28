(function() {
    angular.module('Sharm')
        .controller('accountSettingsController', accountSettingsController);

    function accountSettingsController(user, isAdmin, userService, $route) {
        var model = this;

        model.user = user;
        model.isAdmin = isAdmin;

        model.updatePassword = updatePassword;
        model.updateUser = updateUser;
        model.deleteAccount = deleteAccount;

        function updatePassword() {
            model.passMsg = undefined;
            model.passErr = undefined;
            if((!isAdmin && !model.currentPass) || !model.newPass || !model.confirmPass)
                return;

            if (model.newPass !== model.confirmPass) {
                model.passErr = 'New passwords don\'t match';
                return;
            }

            var passwords = {
                current: model.currentPass,
                new: model.newPass
            };

            userService.updateUserPassword(user, passwords)
                .then(function(response) {
                    model.passMsg = 'Password successfully updated';
                }, function(err) {
                    model.passErr = err.data;
                });
        }

        function updateUser() {
            model.userMsg = undefined;
            model.userErr = undefined;
            userService.updateUser(model.user)
                .then(function(response) {
                    model.userMsg = 'User successfully updated';
                }, function(err) {
                    model.userErr = err.data;
                });
        }

        function deleteAccount() {
            userService.unregister(model.user)
                .then(function (response) {
                    $route.reload();
                })
        }
    }
})();