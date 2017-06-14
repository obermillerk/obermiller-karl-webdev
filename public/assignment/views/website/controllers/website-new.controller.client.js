(function() {
    angular.module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController ($location, $routeParams, websiteService, currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['wid'];

        websiteService
            .findWebsitesByUser(model.userId)
            .then(renderWebsites);

        function renderWebsites(data) {
            model.websites = data;
        }
        model.website = {};

        model.createWebsite = createWebsite;

        function createWebsite() {
            websiteService
                .createWebsite(model.userId, model.website)
                .then(function() {
                    $location.url(model.previousPage);
                });
        }


        model.pageName = "New Website";
        model.leftPanelName = "Websites";
        model.previousPage = "/website/";

        model.navOptions = [
            {name: "Confirm",
                href: model.previousPage,
                glyphicon: "ok",
                click: createWebsite}
        ];

        model.styleType = "website-style";
    }
})();