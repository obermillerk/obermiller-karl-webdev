(function() {
    angular.module('Sharm')
        .controller('collectionController', collectionController);

    function collectionController(currentUser, collectionService, spotifyService, $routeParams) {
        var model = this;

        model.removeFromCollection = removeFromCollection;
        model.currentUser = currentUser;

        var collectionId = $routeParams['collectionid'];
        var collection;

        refreshCollection();

        function refreshCollection() {
            collectionService.getCollection(collectionId)
                .then(function(response) {
                    collection = response;
                    populateCollection();
                });
        }

        function populateCollection() {
            model.collection = {
                tracks: [],
                albums: [],
                name: collection.name,
                user: collection.user
            };
            model.favorites = [];
            if (collection.tracks.length > 0)
                spotifyService.getTracks(collection.tracks)
                    .then(function(tracks) {
                        model.collection.tracks = tracks;
                    });
            if (collection.albums.length > 0)
                spotifyService.getAlbums(collection.albums)
                    .then(function(albums) {
                        model.collection.albums = albums;
                    });
        }

        function removeFromCollection(type, id) {
            collectionService.removeFromCollection(collectionId, type, id)
                .then(function(response) {
                    refreshCollection();
                });
        }
    }
})();