(function () {
    angular.module('Sharm')
        .controller('libraryController', libraryController);

    function libraryController(userService, $routeParams, $route) {
        var model = this;

        model.trackId = $routeParams['trackid'];

        model.addToLibrary = addToLibrary;
        model.removeFromLibrary = removeFromLibrary;

        userService.userHasTrack(model.trackId)
            .then(function(ans) {
                model.isInLibrary = ans;
            });



        function addToLibrary() {
            userService.addTrackToLibrary(model.trackId)
                .then(function(response) {
                        if (response.data === 'Not logged in') {
                            $('#loginModal').modal();
                        } else if (response.data === 'OK') {
                            $route.reload();
                        }
                    });
        }

        function removeFromLibrary() {
            userService.removeTrackFromLibrary(model.trackId)
                .then(function(response) {
                    $route.reload();
                });
        }
    }
})();