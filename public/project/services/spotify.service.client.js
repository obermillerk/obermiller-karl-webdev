(function() {
    angular.module('Sharm')
        .factory('spotifyService', spotifyService);

    function spotifyService($http, $q) {

        var token;

        return {
            requestToken: requestToken,
            search: search,
            getTrack: getTrack,
            getTracks: getTracks,
            getArtist: getArtist,
            getArtists: getArtists,
            getAlbum: getAlbum,
            getAlbums: getAlbums
        };

        function getAuthHead() {
            var deferred = $q.defer();

            if (typeof token === 'undefined')
                requestToken().then(cont, deferred.reject);
            else cont();

            function cont() {
                var auth = "Bearer " + token;
                deferred.resolve({
                    Authorization: auth
                });
            }

            return deferred.promise;
        }


        function requestToken() {
            return $http.post('/project/rest/spotify/token').then(function(response){
                var data = response.data;
                token = data.access_token;
                // var tokenType = data.token_type;
                // var expiresIn = data.expires_in;
                // model.tokenType = tokenType;
            });
        }


        function search(query, page, type, limit) {
            // Default page to 1;
            if (typeof page === 'undefined') {
                page = 1;
            }
            // Default to track search
            if (typeof type === 'undefined')
                type = "track,artist,album";
            if (typeof limit === 'undefined')
                limit = 20;
            var offset = limit * (page - 1);
            var body = {
                q: query,
                type: type,
                offset: offset,
                limit: limit
            };

            return getAuthHead().then(function(head) {
                return $http.get('https://api.spotify.com/v1/search',
                    {params: body, headers: head})
                    .then(function (data) {
                        return data.data;
                    });
            }, function(err) {
                console.error(err);
            });
        }

        function formatDuration(ms) {
            function pad(n) {
                var z = 2;
                return ('0' + n).slice(-z);
            }

            ms = Math.floor(ms / 1000);
            var secs = ms % 60;
            ms = Math.floor(ms / 60);
            var mins = ms % 60;
            var hrs = Math.floor(ms / 60);

            var str = '';
            if (hrs > 0) {
                str = hrs + ':' + pad(mins) + ':' + pad(secs);
            } else {
                str = mins + ':' + pad(secs);
            }

            return str;
        }

        function getTrack(trackId) {
            return getAuthHead().then(function(head) {
                return $http.get('https://api.spotify.com/v1/tracks/' + trackId,
                    {headers: head});
            }).then(function (response) {
                var track = response.data;
                track.duration_formatted = formatDuration(track.duration_ms);
                return track;
            });
        }

        function getTracks(trackIds) {
            return getAuthHead().then(function(head) {
                return $http.get('https://api.spotify.com/v1/tracks?ids=' + trackIds.join(),
                    {headers: head});
            }).then(function (response) {
                var tracks = response.data.tracks;
                for (var t in tracks) {
                    var track = tracks[t];
                    track.duration_formated = formatDuration(track.duration_ms);
                }
                tracks.sort(function(a, b) {
                    return (a.name <  b.name) ? -1 : (a.name === b.name) ? 0 : 1;
                });
                return tracks;
            });
        }

        function getArtist(artistId) {
            return getAuthHead().then(function(head) {
                return $http.get('https://api.spotify.com/v1/artists/' + artistId,
                    {headers: head});
            }).then(function(response) {
                return response.data;
            });
        }

        function getArtists(artistIds) {
            return getAuthHead().then(function(head) {
                return $http.get('https://api.spotify.com/v1/artists?ids=' + artistIds.join(),
                    {headers: head});
            }).then(function(response) {
                return response.data.artists;
            })
        }


        function getAlbum(albumId) {
            return getAuthHead().then(function(head) {
                return $http.get('https://api.spotify.com/v1/albums/' + albumId,
                    {headers: head});
            }).then(function(response) {
                return response.data;
            });
        }

        function getAlbums(albumIds) {
            return getAuthHead().then(function(head) {
                return $http.get('https://api.spotify.com/v1/albums?ids=' + albumIds.join(),
                    {headers: head});
            }).then(function(response) {
                return response.data.albums;
            });
        }
    }
})();