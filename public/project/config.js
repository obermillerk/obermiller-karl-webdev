(function() {
    angular.module("Sharm")
        .config(configRoutes);

    function configRoutes($routeProvider) {
        var routes = [
            ["/",
                "./views/user/templates/home.view.client.html",
                "homeController"],
            ["/register",
                "./views/user/templates/register.view.client.html",
                "registerController"],
            ["/profile/:username",
                "./views/user/templates/profile.view.client.html",
                "profileController",
                {currentUser: currentUser}],
            ["/m/track/:trackid",
                "./views/music/templates/track.view.client.html",
                "trackController",
                {currentUser: currentUser}],
            ["/m/artist/:artistid",
                "./views/music/templates/artist.view.client.html",
                "artistController",
                {currentUser: currentUser}],
            ["/m/search",
                "./views/search/templates/search.view.client.html",
                "searchController"],
            ["/m/search/:type",
                "./views/search/templates/search.view.client.html",
                "searchController"]
        ];

        for (var r in routes) {
            var rt = routes[r];

            var options = { templateUrl: rt[1] };

            if (rt[2]) {
                options.controller = rt[2];
                options.controllerAs = 'model';
            }

            if (rt[3])
                options.resolve = rt[3];

            $routeProvider.when(rt[0], options);
        }

        $routeProvider.otherwise("/");
    }

    /** Retrieve the current user if there is one,
     * otherwise simply be anonymous.
     */
    function currentUser($http) {
        return $http.get('/project/rest/loggedin')
            .then(function(response) {
                var user = response.data;

                if (user !== '0')
                    return user._id ? user : null;
            });
    }

})();