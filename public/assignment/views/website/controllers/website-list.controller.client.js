(function() {
    angular.module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController ($routeParams, websiteService, currentUser) {
        var model = this;

        model.userId = currentUser._id;

        websiteService
            .findWebsitesByUser(model.userId)
            .then(renderWebsites);

        function renderWebsites(data) {
            model.websites = data;
        }

        model.pageName = "Websites";
        model.previousPage = "/profile";

        model.navOptions = [
            {name: "New Website",
                glyphicon: "plus",
                href: "/website/new/"
            }
        ];

        model.styleType = "website-style";
    }
})();