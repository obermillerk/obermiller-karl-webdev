(function() {
    angular
        .module("WebAppMaker")
        .config(configRoutes);

    function configRoutes($routeProvider) {
        var routes = [
            ["/",
                "./views/user/templates/home.view.client.html"],
            ["/login",
                "./views/user/templates/login.view.client.html",
                "loginController",
                {loggedIn: checkLoggedIn}],
            ["/register",
                "./views/user/templates/register.view.client.html",
                "registerController",
                {loggedIn: checkLoggedIn}],
            ["/profile",
                "./views/user/templates/profile.view.client.html",
                "profileController",
                {currentUser: requireLoggedIn}],
            ["/website",
                "./views/website/templates/website-list.view.client.html",
                "websiteListController",
                {currentUser: requireLoggedIn}],
            ["/website/new",
                "./views/website/templates/website-new.view.client.html",
                "websiteNewController",
                {currentUser: requireLoggedIn}],
            ["/website/:wid",
                "./views/website/templates/website-edit.view.client.html",
                "websiteEditController",
                {currentUser: requireLoggedIn}],
            ["/website/:wid/page",
                "./views/page/templates/page-list.view.client.html",
                "pageListController",
                {currentUser: requireLoggedIn}],
            ["/website/:wid/page/new",
                "./views/page/templates/page-new.view.client.html",
                "pageNewController",
                {currentUser: requireLoggedIn}],
            ["/website/:wid/page/:pid",
                "./views/page/templates/page-edit.view.client.html",
                "pageEditController",
                {currentUser: requireLoggedIn}],
            ["/website/:wid/page/:pid/widget",
                "./views/widget/templates/widget-list.view.client.html",
                "widgetListController",
                {currentUser: requireLoggedIn}],
            ["/website/:wid/page/:pid/widget/new",
                "./views/widget/templates/widget-choose.view.client.html",
                "widgetNewController",
                {currentUser: requireLoggedIn}],
            ["/website/:wid/page/:pid/widget/:wgid",
                "./views/widget/templates/widget-edit.view.client.html",
                "widgetEditController",
                {currentUser: requireLoggedIn}],
            ["/website/:wid/page/:pid/widget/:wgid/flickr",
                "./views/widget/templates/edit/widget-flickr-search.view.client.html",
                "widgetFlickrSearchController",
                {currentUser: requireLoggedIn}]
        ];

        for (var r in routes) {
            var route = routes[r];
            var obj = {
                templateUrl: route[1]
            };
            if (route[2]) {
                obj.controller = route[2];
                obj.controllerAs = "model";
            }
            if (route[3])
                obj.resolve = route[3];


            $routeProvider.when(route[0], obj);
        }

        $routeProvider.otherwise({
            redirectTo: "/"
        });
    }

    // Go to the login page if not logged in.
    function requireLoggedIn($q, $http, $location) {
        var deferred = $q.defer();

        $http.get('/assignment/api/loggedin')
            .then(function(response) {
                var user = response.data;
                if (user !== '0') {
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            });

        return deferred.promise;
    }

    // Go to the profile if already logged in.
    function checkLoggedIn($http, $location) {
        return $http.get('/assignment/api/loggedin')
            .then(function(response) {
                var user = response.data;
                if (user !== '0') {
                    $location.url('/profile');
                }
            });
    }
})();