(function() {
    angular.module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($location, $routeParams, userService) {
        var model = this;

        var userId = $routeParams['uid'];

        model.user = userService.findUserById(userId);

        model.pageName = "Profile";

        model.styleType = "website-style";
    }
})();