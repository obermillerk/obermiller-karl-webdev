(function() {
    angular.module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController ($routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams['uid'];

        websiteService
            .findWebsitesByUser(model.userId)
            .then(renderWebsites);

        function renderWebsites(data) {
            model.websites = data;
        }

        model.pageName = "Websites";
        model.previousPage = "/user/" + model.userId;

        model.navOptions = [
            {name: "New Website",
                glyphicon: "plus",
                href: model.previousPage + "/website/new/"
            }
        ];

        model.styleType = "website-style";
    }
})();