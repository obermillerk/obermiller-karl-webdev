(function() {
    angular.module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController ($location, $routeParams, pageService) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        model.pages = pageService.findPagesByWebsite(model.websiteId);
        model.page = angular.copy(pageService.findPageById(model.pageId));

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