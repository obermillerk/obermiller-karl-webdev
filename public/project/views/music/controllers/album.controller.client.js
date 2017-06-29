(function() {
    angular.module('Sharm')
        .controller('albumController', albumController);

    function albumController(album, $sce, spotifyService) {
        var model = this;

        model.album = album;

        var albumId = album.id;

        var url = 'https://open.spotify.com/embed?uri=spotify:album:' + albumId;
        url = $sce.trustAsResourceUrl(url);
        model.embedURL = url;

        // spotifyService.search('album:"'+album.name + '"', 1, 'track', 10)
        //     .then(function(data) {
        //         model.tracks = data.tracks.items;
        //     });

    }

})();