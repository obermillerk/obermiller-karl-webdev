(function() {
    angular
        .module("WebAppMaker")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("default", {
                templateUrl: "/view/user/home.view.client.html"
            })
            .when("/", {
                templateUrl: "/view/user/home.view.client.hmtl"
            })
            .when("/login", {
                templateUrl: "/views/user/login.view.client.html"
            });
    }
})();