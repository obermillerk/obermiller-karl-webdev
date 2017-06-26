(function() {
    angular.module('Sharm')
        .controller('trackController', trackController);

    function trackController(track, $sce, spotifyService) {
        var model = this;

        model.track = track;

        var url = 'https://open.spotify.com/embed?uri=spotify:track:' + track.id;
        url = $sce.trustAsResourceUrl(url);
        model.embedURL = url;
    }

})();