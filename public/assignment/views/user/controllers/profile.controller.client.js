(function() {
    angular.module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location, currentUser) {
        var model = this;

        model.user = currentUser;

        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logout = logout;

        function updateUser(user) {
            userService.updateUser(user._id, user).then(function(){
                model.message = "User updated successfully.";
            });
        }

        function unregister() {
            userService.unregister().then(function() {
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
                        $location.url('/');
                    }
                )
        }

        model.pageName = "Profile";

        model.styleType = "website-style";
    }
})();