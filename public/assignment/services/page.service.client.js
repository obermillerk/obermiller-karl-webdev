(function() {
    angular.module("WebAppMaker")
        .factory("pageService", pageService);

    function pageService() {
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem",
                    "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem",
                    "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem",
                    "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") }
            ];

        var api = {
            createPage: createPage,
            findPagesByWebsite: findPagesByWebsite,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        return api;

        function createPage (websiteId, page) {
            page._id = new Date().getTime()+"";
            page.websiteId = websiteId;
            page.created = new Date();
            page.modified = new Date();

            pages.push(page);
        }

        function findPagesByWebsite (websiteId) {
            var sitePages = [];

            for (var p in pages) {
                var page = pages[p];
                if (page.websiteId === websiteId)
                    sitePages.push(page);
            }

            return sitePages;
        }

        function findPageById (pageId) {
            var page = pages.find(function(page) {
                return page._id === pageId;
            });

            if (typeof page === 'undefined')
                return null;
            return page;
        }

        function updatePage(pageId, page) {
            page.modified = new Date();
            for (var p in pages) {
                var found = pages[p];
                if (found._id === pageId) {
                    pages[p] = page;
                    return true;
                }
            }
            return false;
        }

        function deletePage (pageId) {
            for (var p in pages) {
                var page = pages[p];
                if (page._id === pageId) {
                    pages.splice(p, 1);
                    break;
                }
            }
        }
    }
})();