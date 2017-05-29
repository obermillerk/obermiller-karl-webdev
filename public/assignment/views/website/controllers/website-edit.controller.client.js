(function() {
    angular.module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController ($location, $routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        model.websites = websiteService.findWebsitesByUser(model.userId);
        model.website = angular.copy(websiteService.findWebsiteById(model.websiteId));

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function updateWebsite() {
            websiteService.updateWebsite(model.websiteId, model.website);
            $location.url(model.previousPage);
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId);
            $location.url(model.previousPage);
        }

        model.pageName = "Edit Website";
        model.leftPanelName = "Websites";
        model.previousPage = "/user/" + model.userId + "/website/";

        model.navOptions = [
            {name: "Confirm",
                href: model.previousPage,
                glyphicon: "ok",
                click: updateWebsite},
            {name: "Delete",
                href: model.previousPage,
                glyphicon: "trash",
                click: deleteWebsite}
        ];

        model.styleType = "website-style";
    }
})();