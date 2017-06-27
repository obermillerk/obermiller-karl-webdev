(function() {
    angular.module('Sharm')
        .controller('homeController', homeController);

    function homeController($location) {
        var model = this;

        model.search = search;

        function search(query, page, type) {
            if(!query)
                return;
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
    }
})();