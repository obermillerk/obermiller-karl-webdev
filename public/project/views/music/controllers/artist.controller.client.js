(function() {
    angular.module('Sharm')
        .controller('artistController', artistController);

    function artistController($routeParams, $sce, spotifyService) {
        var model = this;

        var artistId = $routeParams['artistid'];

        var url = 'https://open.spotify.com/embed?uri=spotify:artist:' + artistId;
        url = $sce.trustAsResourceUrl(url);
        model.embedURL = url;

        spotifyService.getArtist(artistId)
            .then(function(artist) {
                    console.log(artist);
                    model.artist = artist;
                    return spotifyService.search('artist:"'+artist.name + '"', 1, 'track', 10);
                },
                function(err) {
                    console.error(err);
                })
            .then(function(data) {
                console.log(data.tracks);
                model.tracks = data.tracks.items;
            });

    }

})();