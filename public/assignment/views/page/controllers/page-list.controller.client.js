(function() {
    angular.module("WebAppMaker")
        .controller("pageListController", pageListController);

    function pageListController ($routeParams, pageService) {
        var model = this;

        model.websiteId = $routeParams['wid'];

        pageService
            .findPagesByWebsite(model.websiteId)
            .then(renderPages);

        function renderPages(data) {
            model.pages = data;
        }

        model.previousPage = "/website/";
        model.pageName = "Pages";

        model.navOptions = [
            {name: "New Page",
                glyphicon: "plus",
                href: model.previousPage + model.websiteId + "/page/new/"
            }
        ];

        model.styleType = "page-style";
    }
})();