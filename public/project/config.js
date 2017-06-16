(function() {
    angular.module("Sharm")
        .config(configRoutes);

    function configRoutes($routeProvider) {
        var routes = [
            ["/",
                "./views/user/templates/home.view.client.html",
                "homeController"],
            ["/login",
                "./views/user/templates/login.view.client.html",
                "loginController"],
            ["/register",
                "./views/user/templates/register.view.client.html",
                "registerController"],
            ["/profile/:username",
                "./views/user/templates/profile.view.client.html",
                "profileController",
                {currentUser: currentUser}]
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
    }

    function currentUser($http) {
        return $http.get('/project/rest/loggedin')
            .then(function(response) {
                console.log(response);
                var user = response.data;
                console.log(user);

                if (user !== '0')
                    return user._id ? user : null;
            });
    }

})();