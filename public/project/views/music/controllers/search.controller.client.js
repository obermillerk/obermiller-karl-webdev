(function() {
    angular.module('Sharm')
        .controller('searchController', searchController);

    function searchController(spotifyService, $routeParams, $location) {
        var model = this;

        if ($routeParams['q']) {
            model.q = $routeParams['q'];
            model.page = $routeParams['page'];
            searchExecute(model.q, model.page);
        }

        model.search = search;
        model.nextPage = nextPage;
        model.lastPage = lastPage;
        model.prevPage = prevPage;
        model.firstPage = firstPage;

        function search(query, page, type) {
            var url = '/m/search?';
            url += 'q=' + query;
            if (page)
                url += '&page=' + page;
            if (type)
                url += '&type=' + type;

            $location.url(url);
        }

        function searchExecute(query, page, type) {
            if (typeof page === 'undefined')
                page = 1;

            spotifyService.search(query, page, type).then(function (data) {
                    model.tracks = data.tracks.items;
                    model.query = query;
                    model.totalPages = Math.ceil(data.tracks.total / 20);
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
                search(model.query, model.totalPages);
        }

        function nextPage() {
            if (typeof model.query !== 'undefined' && model.page < model.totalPages)
                search(model.query, Number(model.page) + 1);
        }

        function firstPage() {
            if (typeof model.query !== 'undefined' && model.page > 1)
                search(model.query, 1);
        }

        function prevPage() {
            if (typeof model.query !== 'undefined' && model.page > 1)
                search(model.query, Number(model.page) - 1);
        }
    }
})();