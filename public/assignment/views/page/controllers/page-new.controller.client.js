(function() {
    angular.module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController ($location, $routeParams, pageService) {
        var model = this;

        model.websiteId = $routeParams['wid'];

        pageService
            .findPagesByWebsite(model.websiteId)
            .then(renderPages);

        function renderPages(data) {
            model.pages = data;
        }

        model.page = {};

        model.createPage = createPage;

        function createPage() {
            pageService
                .createPage(model.websiteId, model.page)
                .then(function(response) {
                    $location.url(model.previousPage);
                });
        }

        model.pageName = "New Page";
        model.leftPanelName = "Pages";
        model.previousPage = "/website/" + model.websiteId + "/page/";

        model.navOptions = [
            {name: "Confirm",
                href: model.previousPage,
                glyphicon: "ok",
                click: createPage}
        ];

        model.styleType = "page-style";
    }
})();