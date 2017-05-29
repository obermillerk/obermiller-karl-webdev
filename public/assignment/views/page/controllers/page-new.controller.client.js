(function() {
    angular.module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController ($location, $routeParams, pageService) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        model.pages = pageService.findPagesByWebsite(model.websiteId);
        model.page = {};

        model.createPage = createPage;

        function createPage() {
            pageService.createPage(model.websiteId, model.page);
            $location.url(model.previousPage);
        }

        model.pageName = "New Page";
        model.leftPanelName = "Pages";
        model.previousPage = "/user/" + model.userId + "/website/" + model.websiteId + "/page/";

        model.navOptions = [
            {name: "Confirm",
                href: model.previousPage,
                glyphicon: "ok",
                click: createPage}
        ];

        model.styleType = "page-style";
    }
})();