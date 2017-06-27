(function () {
    angular.module('Sharm')
        .controller('favoriteController', favoriteController);

    function favoriteController(userService, $routeParams) {
        var model = this;

        model.id = $routeParams['artistid'];

        model.addToFavorites = addToFavorites;
        model.removeFromFavorites = removeFromFavorites;

        refresh();

        function refresh() {
            userService.isInFavorites(model.id)
                .then(function(ans) {
                    model.isInFavorites = ans;
                });
        }


        function addToFavorites() {
            userService.addToFavorites(model.id)
                .then(function(response) {
                        if (response.data === 'Not logged in') {
                            $('#loginModal').modal();
                        } else if (response.data === 'OK') {
                            refresh();
                        }
                    });
        }

        function removeFromFavorites() {
            userService.removeFromFavorites(model.id)
                .then(function(response) {
                    refresh();
                });
        }
    }
})();