(function() {
    angular.module('Sharm')
        .controller('profileController', profileController);

    function profileController(currentUser) {
        var model = this;

        model.user = currentUser;
    }
})();