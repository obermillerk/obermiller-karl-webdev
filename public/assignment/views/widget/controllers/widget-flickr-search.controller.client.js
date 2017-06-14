(function() {
    angular.module('WebAppMaker')
        .controller('widgetFlickrSearchController', widgetFlickrSearchController);

    function widgetFlickrSearchController($location, $routeParams, widgetService, flickrService) {
        var model = this;

        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];


        model.searchPhotos = function(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(data) {
                    model.photos = data.photos;
                });
        };

        model.selectPhoto = function(photo) {
            model.selected = photo;
        };

        model.deselectPhoto = function() {
            model.selected = null;
        };

        model.finalizeSelection = function(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            widgetService.findWidgetById(model.widgetId)
                .then(function(widget) {
                    widget.url = url;
                    return widgetService.updateWidget(model.widgetId, widget)
                })
                .then(function(widget) {
                    var url = "/website/" + model.websiteId
                        + "/page/" + model.pageId + "/widget";
                    $location.url(url);
                });
        };


        model.pageName = "Search Flickr";
        model.previousPage = "/website/" + model.websiteId
            + "/page/" + model.pageId + "/widget/" + model.widgetId;

        model.styleType = "page-style";
    }
})();