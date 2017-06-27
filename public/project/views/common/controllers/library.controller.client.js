(function () {
    angular.module('Sharm')
        .controller('libraryController', libraryController);

    function libraryController(userService, $routeParams, $attrs, $route) {
        var model = this;

        model.type = $attrs.type;

        model.id = $routeParams[model.type + 'id'];

        model.addToLibrary = addToLibrary;
        model.removeFromLibrary = removeFromLibrary;

        refresh();

        function refresh() {
            userService.isInLibrary(model.type, model.id)
                .then(function(ans) {
                    model.isInLibrary = ans;
                });
        }



        function addToLibrary() {
            userService.addToLibrary(model.type, model.id)
                .then(function(response) {
                        if (response.data === 'Not logged in') {
                            $('#loginModal').modal();
                        } else if (response.data === 'OK') {
                            refresh();
                        }
                    });
        }

        function removeFromLibrary() {
            userService.removeFromLibrary(model.type, model.id)
                .then(function(response) {
                    refresh();
                });
        }
    }
})();