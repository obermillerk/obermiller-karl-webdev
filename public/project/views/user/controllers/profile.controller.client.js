(function() {
    angular.module('Sharm')
        .controller('profileController', profileController);

    function profileController(currentUser, profileUser, spotifyService, $routeParams, $location) {
        var model = this;

        var username = $routeParams['username'];

        model.user = profileUser;
        populateLibrary();

        function populateLibrary() {
            model.library = {
                tracks: []
            };
            if (model.user.library.tracks.length < 1) return;
            spotifyService.getTracks(model.user.library.tracks)
                .then(function(tracks) {
                    model.library.tracks = tracks;
                });
        }
    }
})();