(function() {
    angular.module('Sharm')
        .controller('trackController', trackController);

    function trackController($routeParams, $sce, spotifyService) {
        var model = this;

        var trackId = $routeParams['trackid'];

        var url = 'https://open.spotify.com/embed?uri=spotify:track:' + trackId;
        url = $sce.trustAsResourceUrl(url);
        model.embedURL = url;

        spotifyService.getTrack(trackId)
            .then(function(track) {
                console.log(track);
                model.track = track;
            },
            function(err) {
                console.error(err);
            });
    }

})();