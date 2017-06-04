(function() {
    angular.module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController ($location, $routeParams, pageService) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        pageService
            .findPagesByWebsite(model.websiteId)
            .then(renderPages);

        function renderPages(data) {
            model.pages = data;
        }

        pageService
            .findPageById(model.pageId).then(renderPage);

        function renderPage(data) {
            model.page = angular.copy(data);
        }

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function updatePage() {
            pageService.updatePage(model.pageId, model.page);
            $location.url(model.previousPage);
        }

        function deletePage() {
            pageService.deletePage(model.pageId);
            $location.url(model.previousPage);
        }

        model.pageName = "Edit Page";
        model.leftPanelName = "Pages";
        model.previousPage = "/user/" + model.userId + "/website/" + model.websiteId + "/page/";

        model.navOptions = [
            {name: "Confirm",
                href: model.previousPage,
                glyphicon: "ok",
                click: updatePage},
            {name: "Delete",
                href: model.previousPage,
                glyphicon: "trash",
                click: deletePage}
        ];

        model.styleType = "page-style";
    }
})();