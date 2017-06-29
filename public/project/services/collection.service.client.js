(function() {
    angular.module('Sharm')
        .factory('collectionService', collectionService);

    function collectionService($http) {
        return {
            createCollection: createCollection,
            deleteCollection: deleteCollection,
            findCollectionsByUser: findCollectionsByUser,
            getCollection: getCollection,
            addToCollection: addToCollection,
            removeFromCollection: removeFromCollection
        };


        function createCollection(name) {
            return $http.post('/project/rest/collection', {name: name});
        }

        function deleteCollection(collectionId) {
            return $http.delete('/project/rest/collection/' + collectionId);
        }

        function findCollectionsByUser(username) {
            return $http.get('/project/rest/collection/user/' + username)
                .then(function(response) {
                    return response.data;
                });
        }

        function getCollection(collectionId) {
            return $http.get('/project/rest/collection/' + collectionId)
                .then(function(response) {
                    return response.data;
                });
        }

        function addToCollection(collectionId, type, id) {
            return $http.put('/project/rest/collection/' + collectionId + '/' + type, {id: id});
        }

        function removeFromCollection(collectionId, type, id) {
            return $http.delete('/project/rest/collection/' + collectionId + '/' + type + '/' + id);
        }
    }
})();