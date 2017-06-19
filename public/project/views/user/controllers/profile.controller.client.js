(function() {
    angular.module('Sharm')
        .controller('profileController', profileController);

    function profileController(userService, currentUser, $routeParams) {
        var model = this;

        var username = $routeParams['username'];

        if (currentUser && currentUser.username === username)
            model.user = currentUser;

        else
            userService.findUserByUsername(username)
                .then(function(user) {
                    model.user = user;
                });

    }
})();