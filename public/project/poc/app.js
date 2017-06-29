(function() {
    angular.module("poc", ["ngRoute"])
        .controller("pocController", pocController);

    function pocController($http, $location, $routeParams, $window) {
        var clientId = "fcc5920d0cea42f69ceb36bec650c230";
        var callback = $location.absUrl();
        callback = callback.substr(0,callback.lastIndexOf('/')) + '/callback.html';
        var token;

        var model = this;

        // This is just a workaround due to the lack of an easy way to get query params
        // from the URL without setting up #! routing.
        var queryStatements = $window.location.search.substring(1).split('/[&||?]/');
        var query = {};
        for (var i in queryStatements) {
            var pairs = queryStatements[i].split('=');
            query[pairs[0]] = pairs[1];
        }

        model.code = query.code;
        if (typeof query.state !== 'undefined') {
            model.state = query.state;
        }


        // model.authorize = authorize;
        model.requestToken = requestToken;
        model.search = search;
        model.nextPage = nextPage;
        model.prevPage = prevPage;
        model.select = select;
        model.deselect = deselect;

        function select(track) {
            model.selected = track;
            track.duration_formated = formatDuration(track.duration_ms);
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

        function deselect() {
            model.selected = null;
        }

        function search(query, page, type) {
            if (typeof model.token === 'undefined') {
                requestToken().then(body);
            } else {
                body();
            }

            function body() {
                // Default page to 0;
                if (typeof page === 'undefined') {
                    page = 1;
                }
                var offset = 20 * (page - 1);
                // Default to track search
                if (typeof type === 'undefined')
                    type = "track";
                var body = {
                    q: query,
                    type: type,
                    offset: offset
                };
                var auth = "Bearer " + model.token;
                var head = {
                    Authorization: auth
                };
                exec();

                function exec() {
                    $http.get('https://api.spotify.com/v1/search', {params: body, headers: head})
                        .then(function (data) {
                            data = data.data;
                            model.tracks = data.tracks.items;
                            model.query = query;
                            model.totalPages = Math.ceil(data.tracks.total / 20);
                            model.page = page;
                        }, function (response) {
                            var error = response.data.error;
                            // If token is expired, request a new token and try again.
                            if (error.message === 'The access token expired') {
                                requestToken()
                                    .then(exec);
                            }
                            else return error;
                        });
                }
            }
        }


        // Used for user authorization of account-specific functionality.
        // Not used in POC.
        function authorize() {
            var url = "https://accounts.spotify.com/authorize?"
                + "client_id=" + clientId + "&response_type=code&redirect_uri=" + callback;
            $window.location.href = url;
        }

        function requestToken() {
            // var body = {
            //     code: model.code,
            //     cb: callback
            // };

            return $http.post('/project/rest/spotify/token').then(function(data){
                data = data.data;
                var accessToken = data.access_token;
                var tokenType = data.token_type;
                var expiresIn = data.expires_in;
                model.tokenType = tokenType;
                model.token = accessToken;
            });
        }
    }


})();