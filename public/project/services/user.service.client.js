(function() {
    angular.module('Sharm')
        .factory('userService', userService);

    function userService($http, $q) {
        return {
            register: register,
            unregister: unregister,
            login: login,
            logout: logout,
            findUserByUsername: findUserByUsername,
            getCurrentUser: getCurrentUser,
            isUserSelf: isUserSelf,

            // Follow functions
            followUser: followUser,
            unfollowUser: unfollowUser,
            isCurrentUserFollowing: isCurrentUserFollowing,

            // Library functions
            isInLibrary: isInLibrary,
            addToLibrary: addToLibrary,
            removeFromLibrary: removeFromLibrary,

            // Favorites functions
            isInFavorites: isInFavorites,
            addToFavorites: addToFavorites,
            removeFromFavorites: removeFromFavorites
        };

        function register(user) {
            return $http.post('/project/rest/register', user)
                .then(function(response) {
                    return response.data;
                });
        }

        function unregister(user) {
            return $http.post('/project/rest/unregister', user);
        }

        function login(user) {
            return $http.post('/project/rest/login', user)
                .then(function(response) {
                    return response.data;
                })
        }

        function logout() {
            return $http.post('/project/rest/logout');
        }

        function findUserByUsername(username) {
            return $http.get('/project/rest/user/' + username)
                .then(function(response) {
                    return response.data;
                });
        }

        function getCurrentUser() {
            return $http.get('/project/rest/loggedin')
                .then(function(response) {
                    var user = response.data;
                    return user._id ? user : null;
                });
        }

        function followUser(user) {
            return $http.post('/project/rest/follow', user);
        }

        function unfollowUser(user) {
            return $http.post('/project/rest/unfollow', user);
        }

        function isCurrentUserFollowing(user) {
            return $http.get('/project/rest/follow/' + user.username)
                .then(function(response) {
                    return response.data;
                });
        }

        function isUserSelf(user) {
            return $http.get('/project/rest/self/' + user.username)
                .then(function(response) {
                    return response.data;
                });
        }

        function isInLibrary(type, id) {
            return $http.get('/project/rest/library/' + type + '/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        function addToLibrary(type, id) {
            return $http.put('/project/rest/library/' + type + '/' + id);
        }

        function removeFromLibrary(type, id) {
            return $http.delete('/project/rest/library/' + type + '/' + id);
        }

        function isInFavorites(artistId) {
            return $http.get('/project/rest/favorites/' + artistId)
                .then(function(response) {
                    return response.data;
                });
        }

        function addToFavorites(artistId) {
            return $http.put('/project/rest/favorites/' + artistId);
        }

        function removeFromFavorites(artistId) {
            return $http.delete('/project/rest/favorites/' + artistId);
        }
    }
})();