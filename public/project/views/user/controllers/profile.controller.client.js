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
                tracks: [],
                albums: []
            };
            model.favorites = [];
            if (model.user.library.tracks.length > 0)
                spotifyService.getTracks(model.user.library.tracks)
                    .then(function(tracks) {
                        model.library.tracks = tracks;
                    });
            if (model.user.library.albums.length > 0)
                spotifyService.getAlbums(model.user.library.albums)
                    .then(function(albums) {
                        model.library.albums = albums;
                    });
            if (model.user.favorite_artists.length > 0)
                spotifyService.getArtists(model.user.favorite_artists)
                    .then(function(artists) {
                        model.favorites = artists;
                    })
        }
    }
})();