(function () {
    angular.module('Sharm')
        .controller('libraryController', libraryController);

    function libraryController(userService, collectionService, $routeParams, $attrs, $route) {
        var model = this;

        var currentUser = null;

        userService.getCurrentUser()
            .then(function(user) {
                currentUser = user;
                refreshCollections();
            });

        model.type = $attrs.type;

        model.collections = [];

        model.id = $routeParams[model.type + 'id'];

        model.addToLibrary = addToLibrary;
        model.removeFromLibrary = removeFromLibrary;
        model.createCollection = createCollection;
        model.addToCollection = addToCollection;

        refresh();
        refreshCollections();

        function refresh() {
            userService.isInLibrary(model.type, model.id)
                .then(function(ans) {
                    model.isInLibrary = ans;
                });
        }


        function refreshCollections() {
            if (currentUser === null) {
                model.collections = [];
            } else
                collectionService.findCollectionsByUser(currentUser.username)
                    .then(function(collections) {
                        console.log(collections);
                        model.collections = collections;
                    });
        }


        function addToLibrary() {
            userService.addToLibrary(model.type, model.id)
                .then(function(response) {
                    if (response.data === 'Not logged in') {
                        $('#loginModal').modal();
                    } else if (response.data === 'OK') {
                        refresh();
                    }
                });
        }

        function removeFromLibrary() {
            userService.removeFromLibrary(model.type, model.id)
                .then(function(response) {
                    refresh();
                });
        }

        function createCollection(name) {
            collectionService.createCollection(name)
                .then(function(response) {
                    if (response.data === 'Not logged in') {
                        $('#collectionModal').modal('hide');
                        $('#loginModal').modal();
                    } else {
                        console.log(response);
                        addToCollection(response.data._id, model.type, model.id);
                        refreshCollections();
                    }
                });
        }

        function addToCollection(collectionId, type, id) {
            collectionService.addToCollection(collectionId, type, id)
                .then(function(response) {
                    $('#collectionModal').modal('hide');
                });
        }
    }
})();