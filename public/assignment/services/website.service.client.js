(function() {
    angular.module("WebAppMaker")
        .factory("websiteService", websiteService);

    function websiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem",
                "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem",
                "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem",
                "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem",
                "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem",
                "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem",
                "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem",
                "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") }
        ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };

        return api;

        function createWebsite (userId, website) {
            website._id = new Date().getTime()+"";
            website.developerId = userId;
            website.created = new Date();
            website.modified = new Date();

            websites.push(website);
        }

        function findWebsitesByUser (userId) {
            var userSites = [];

            for (var w in websites) {
                var site = websites[w];
                if (site.developerId === userId)
                    userSites.push(site);
            }

            return userSites;
        }

        function findWebsiteById (websiteId) {
            var website = websites.find(function(website) {
                return website._id === websiteId;
            });

            if (typeof website === 'undefined')
                return null;
            return website;
        }

        function updateWebsite(websiteId, website) {
            website.modified = new Date();
            for (var w in websites) {
                var found = websites[w];
                if (found._id === websiteId) {
                    websites[w] = website;
                    return true;
                }
            }
            return false;
        }

        function deleteWebsite (websiteId) {
            for (var w in websites) {
                var website = websites[w];
                if (website._id === websiteId) {
                    websites.splice(w, 1);
                    break;
                }
            }
        }
    }
})();