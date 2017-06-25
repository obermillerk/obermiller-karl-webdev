(function() {
    angular.module('Sharm')
        .controller('profileController', profileController);

    function profileController(userService, currentUser, spotifyService, $routeParams) {
        var model = this;

        var username = $routeParams['username'];

        if (currentUser && currentUser.username === username) {
            model.user = currentUser;
            populateLibrary();
        }

        else
            userService.findUserByUsername(username)
                .then(function(user) {
                    model.user = user;
                    populateLibrary();
                });

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