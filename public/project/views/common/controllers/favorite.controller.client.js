(function () {
    angular.module('Sharm')
        .controller('favoriteController', favoriteController);

    function favoriteController(userService, $routeParams, $route) {
        var model = this;

        model.id = $routeParams['artistid'];

        model.addToFavorites = addToFavorites;
        model.removeFromFavorites = removeFromFavorites;

        userService.isInFavorites(model.id)
            .then(function(ans) {
                model.isInFavorites = ans;
            });



        function addToFavorites() {
            userService.addToFavorites(model.id)
                .then(function(response) {
                        if (response.data === 'Not logged in') {
                            $('#loginModal').modal();
                        } else if (response.data === 'OK') {
                            $route.reload();
                        }
                    });
        }

        function removeFromFavorites() {
            userService.removeFromFavorites(model.id)
                .then(function(response) {
                    $route.reload();
                });
        }
    }
})();