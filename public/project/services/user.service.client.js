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
            // userHasTrack: userHasTrack,
            // addTrackToLibrary: addTrackToLibrary,
            // removeTrackFromLibrary: removeTrackFromLibrary,
            isInLibrary: isInLibrary,
            addToLibrary: addToLibrary,
            removeFromLibrary: removeFromLibrary
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
                    console.log(response.data);
                    return response.data;
                });
        }

        function addToLibrary(type, id) {
            return $http.post('/project/rest/library/add/' + type + '/' + id);
        }

        function removeFromLibrary(type, id) {
            return $http.post('/project/rest/library/remove/' + type + '/' + id);
        }

        function userHasTrack(trackId) {
            return $http.get('/project/rest/library/track/' + trackId)
                .then(function(response) {
                    return response.data;
                })
        }

        function userHasAlbum(albumId) {
            return $http.get('/project/rest/library/album' + albumId)
                .then(function(response) {
                    return response.data;
                })
        }

        function addTrackToLibrary(trackId) {
            return $http.post('/project/rest/library/add/track/' + trackId);
        }

        function removeTrackFromLibrary(trackId) {
            return $http.post('/project/rest/library/remove/track/' + trackId);
        }
    }
})();