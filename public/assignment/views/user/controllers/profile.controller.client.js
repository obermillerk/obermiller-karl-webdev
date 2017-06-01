(function() {
    angular.module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location) {
        var model = this;

        var userId = $routeParams['uid'];

        userService
            .findUserById(userId)
            .then(renderUser);

        function renderUser(user) {
            model.user = user;
        }

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

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

        model.pageName = "Profile";

        model.styleType = "website-style";
    }
})();