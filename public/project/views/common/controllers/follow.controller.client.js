(function () {
    angular.module('Sharm')
        .controller('followController', followController);

    function followController(userService, $routeParams) {
        var model = this;

        var username = $routeParams['username'];

        model.followUser = followUser;
        model.unfollowUser = unfollowUser;
        userService.findUserByUsername(username)
            .then(function(user) {
                model.user = user;
                return userService.isUserSelf(user);
            })
            .then(function(ans) {
                model.isSelf = ans;
                refresh();
            });

        function refresh() {
            userService.isCurrentUserFollowing(model.user)
                .then(function(ans) {
                    model.isFollowing = ans;
                });
        }



        function followUser() {
            userService.followUser(model.user)
                .then(function(response) {
                        if (response.data === 'Not logged in') {
                            $('#loginModal').modal();
                        } else if (response.data === 'OK') {
                            refresh();
                        }
                    });
        }

        function unfollowUser() {
            userService.unfollowUser(model.user)
                .then(function(response) {
                    refresh();
                });
        }
    }
})();