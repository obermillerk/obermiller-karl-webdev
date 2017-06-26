(function() {
    angular.module('Sharm')
        .controller('artistController', artistController);

    function artistController(artist, $sce, spotifyService) {
        var model = this;

        model.artist = artist;

        var artistId = artist.id;

        var url = 'https://open.spotify.com/embed?uri=spotify:artist:' + artistId;
        url = $sce.trustAsResourceUrl(url);
        model.embedURL = url;

        spotifyService.search('artist:"'+artist.name + '"', 1, 'track', 10)
            .then(function(data) {
                model.tracks = data.tracks.items;
            });

    }

})();