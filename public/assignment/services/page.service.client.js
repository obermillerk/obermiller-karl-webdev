(function() {
    angular.module("WebAppMaker")
        .factory("pageService", pageService);

    function pageService($http) {
        var api = {
            createPage: createPage,
            findPagesByWebsite: findPagesByWebsite,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        return api;

        function createPage (websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";

            return $http.post(url, page).then(unwrapData);
        }

        function findPagesByWebsite (websiteId) {
            var url = "/api/website/" + websiteId + "/page";

            return $http.get(url).then(unwrapData);
        }

        function findPageById (pageId) {
            var url = "/api/page/" + pageId;

            return $http.get(url).then(unwrapData);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;

            return $http.put(url, page).then(unwrapData);
        }

        function deletePage (pageId) {
            var url = "/api/page/" + pageId;

            return $http.delete(url);
        }

        function unwrapData(response) {
            return response.data;
        }
    }
})();