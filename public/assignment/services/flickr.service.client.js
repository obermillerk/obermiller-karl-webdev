(function () {
    var key = "f1e8bcb1dd8630dcfa89df764dcbea6b";
    var secret = "2a4551b51997bb5b";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    angular
        .module("WebAppMaker")
        .service("flickrService", flickrService);

    function flickrService($http) {
        var api = {
            searchPhotos: searchPhotos
        };

        return api;


        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url).then(function(response) {
                data = response.data.replace("jsonFlickrApi(", "");
                data = data.substring(0,data.length - 1);
                data = JSON.parse(data);
                return data;
            });
        }
    }
})();