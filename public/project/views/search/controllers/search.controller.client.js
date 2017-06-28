(function() {
    angular.module('Sharm')
        .controller('searchController', searchController);

    function searchController(spotifyService, $routeParams, $location) {
        var model = this;

        model.type = $routeParams['type'];

        if ($routeParams['q']) {
            model.q = $routeParams['q'];
            model.page = $routeParams['page'] ? $routeParams['page'] : 1;
            if (model.type) {
                var limit = 20;
                searchExecute(model.q, model.page, model.type, limit);
            }
            else
                searchExecute(model.q);
        }

        model.search = search;
        model.nextPage = nextPage;
        model.lastPage = lastPage;
        model.prevPage = prevPage;
        model.firstPage = firstPage;

        function search(query, page, type) {
            var url = '/m/search';
            var multitype = true;
            if (type && type.split(',').length === 1) {
                url += '/' + type;
                multitype = false;
            }
            url += '?q=' + query;
            if (page)
                url += '&page=' + page;
            if (type && multitype)
                url += '&type=' + type;

            $location.url(url);
        }

        function searchExecute(query, page, type, limit) {
            if (typeof page === 'undefined')
                page = 1;
            if (typeof limit === 'undefined')
                limit = 6;

            spotifyService.search(query, page, type, limit).then(function (data) {
                    console.log(data);
                    if (data.tracks)
                        model.tracks = data.tracks.items;
                    if (data.artists)
                        model.artists = data.artists.items;
                    if (data.albums)
                        model.albums = data.albums.items;
                    if (model.type) {
                        var total = 0;
                        switch(model.type) {
                            case 'track':
                                total = data.tracks.total;
                                break;
                            case 'artist':
                                total = data.artists.total;
                                break;
                            case 'album':
                                total = data.albums.total;
                                break;
                        }
                    }
                    model.query = query;
                    model.totalPages = Math.ceil(total / limit);
                    if (page > model.totalPages)
                        search(query, model.totalPages);
                    model.page = page;
                },
                function (response) {
                    console.error(response);
                });
        }


        function lastPage() {
            if (typeof model.query !== 'undefined' && model.page < model.totalPages)
                search(model.query, model.totalPages, model.type);
        }

        function nextPage() {
            if (typeof model.query !== 'undefined' && model.page < model.totalPages)
                search(model.query, Number(model.page) + 1, model.type);
        }

        function firstPage() {
            if (typeof model.query !== 'undefined' && model.page > 1)
                search(model.query, 1, model.type);
        }

        function prevPage() {
            if (typeof model.query !== 'undefined' && model.page > 1)
                search(model.query, Number(model.page) - 1, model.type);
        }
    }
})();