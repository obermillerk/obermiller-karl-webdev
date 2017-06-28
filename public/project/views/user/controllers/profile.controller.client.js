(function() {
    angular.module('Sharm')
        .controller('profileController', profileController);

    function profileController(currentUser, profileUser, spotifyService, $routeParams) {
        var model = this;

        var username = $routeParams['username'];

        var section = $routeParams['section'];

        model.section = $routeParams['section'];

        model.isActive = isActive;

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

        function isActive(section) {
            if (typeof model.section === 'undefined' && section === 'posts')
                return 'active';
            else if(section === model.section)
                return 'active';
            else return '';
        }
    }
})();