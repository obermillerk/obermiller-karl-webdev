(function() {
    angular.module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location, $rootScope) {
        var model = this;

        model.userId = $routeParams['uid'];

        userService
            .findUserById(model.userId)
            .then(renderUser);

        function renderUser(user) {
            model.user = user;
        }

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function updateUser(user) {
            userService.updateUser(user._id, user).then(function(){
                model.message = "User updated successfully.";
            });
        }

        function deleteUser(userId) {
            userService.deleteUser(userId).then(function() {
                $location.url("/");
            }, function() {
                model.error = "Could not find user, delete unsuccessful.";
            });
        }

        function logout() {
            userService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url('/');
                    }
                )
        }

        model.pageName = "Profile";

        model.styleType = "website-style";
    }
})();