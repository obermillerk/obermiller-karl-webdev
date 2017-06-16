(function() {
    angular.module("WebAppMaker")
        .factory("websiteService", websiteService);

    function websiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };

        return api;

        function createWebsite (userId, website) {
            var url = "/assignment/api/user/" + userId + "/website";

            return $http.post(url, website).then(unwrapData);
        }

        function findWebsitesByUser (userId) {
            var url = "/assignment/api/user/" + userId + "/website";

            return $http.get(url).then(unwrapData);
        }

        function findWebsiteById (websiteId) {
            var url = "/assignment/api/website/" + websiteId;

            return $http.get(url).then(unwrapData);
        }

        function updateWebsite(websiteId, website) {
            var url = "/assignment/api/website/" + websiteId;

            return $http.put(url, website).then(unwrapData);
        }

        function deleteWebsite (websiteId) {
            var url = "/assignment/api/website/" + websiteId;

            return $http.delete(url);
        }

        function unwrapData(response) {
            return response.data;
        }
    }
})();