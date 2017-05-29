(function() {
    angular.module("WebAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController ($sce, $routeParams, widgetService) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        model.widgets = widgetService.findWidgetsByPage(model.pageId);

        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.trustHtmlContent = trustHtmlContent;

        function getYouTubeEmbedUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + id);
        }

        function trustHtmlContent(html) {
            return $sce.trustAsHtml(html);
        }

        model.pageName = "Widgets";
        model.previousPage = "/user/" + model.userId + "/website/"
            + model.websiteId + "/page/";

        model.navOptions = [
            {name: "New Widget",
                glyphicon: "plus",
                href: model.previousPage + model.pageId + "/widget/new/"
            }
        ];

        model.styleType = "page-style";
    }
})();